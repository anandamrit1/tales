import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Heading, Tag } from "degen";
import { ArticleType, Author } from "types/types";
import { useAuthor, useReader } from "hooks/useAuthor";
// @ts-ignore
import edjsParser from 'editorjs-parser'
import SubscribeModel from "components/SubscribeModel";
import { FlowLogo } from "images";
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import GetPartialPostById from '../cadence/scripts/GetPartialPostById.cdc'
// @ts-ignore
import GetArticle from '../cadence/scripts/GetArticle.cdc'
// @ts-ignore
import PurchaseArticle from '../cadence/transactions/PurchaseArticle.cdc'

import useCurrentUser from "hooks/useCurrentUser";
import { subscribeTxStatus } from "utils/subscribeTxStatus";
import Loader from "components/Loader";
import { SkeletonLoader } from "components/Skeleton";
import { getIpfsURL } from "utils/ipfs";

type PostProps = {
    post?: ArticleType;
    isPreview?: boolean
    authorIdForPreview?: string
    articleIdForPreview?: string
};


const ArticlePage = ({ post, isPreview = false, authorIdForPreview }: PostProps) => {
    const { authorId, articleId } = useParams() ?? {};
    const { author, isAuthorLoading } = useAuthor(isPreview ? authorIdForPreview : authorId)
    const user = useCurrentUser();

    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState<ArticleType>();
    const [show, setShow] = useState(false);
    const [showArticle, setShowArticle] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const purchaseArticle = async (authorAddress: string, postId: String, price: number) => {
        try {
            const transactionId = await fcl.mutate({
                cadence: PurchaseArticle,
                args: (arg: any, t: any) => [arg(authorAddress, t.Address),
                arg(postId, t.UInt64),
                arg(price.toFixed(2), t.UFix64)]
            })
            subscribeTxStatus(transactionId)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handlePaidArticle = () => {
        if (showLogin) {
            fcl?.authenticate()
        } else if (article?.price > 0 && article?.content?.blocks?.length == 0) {
            purchaseArticle(authorId, article?.id, article?.price)
        }
    }

    useEffect(() => {
        if (isPreview) {
            setArticle(post)
        }
    }, [isPreview, post])


    useEffect(() => {
        const getMyArticleById = async (address: string, postId: String) => {
            let res;
            try {
                res = await fcl.query({
                    cadence: GetPartialPostById,
                    args: (arg: any, t: any) => [arg(address, t.Address), arg(postId, t.UInt64)]
                })
            } catch (e) { res = []; console.log(e) }
            console.log("Res: ", res)
            return res
        }

        const getPaidArticle = async (authorAddress: string, readerAddress: string, postId: String) => {
            let res;
            try {
                res = await fcl.query({
                    cadence: GetArticle,
                    args: (arg: any, t: any) => [arg(authorAddress, t.Address), arg(readerAddress, t.Address), arg(postId, t.UInt64)]
                })
            } catch (e) { res = []; console.log(e) }
            console.log("Res: ", res)
            return res
        }

        const getArticlesByAuthor = async (address: string) => {
            const articleById = await getMyArticleById(address, articleId)

            if (parseInt(articleById.price) === 0) {
                const data: any = await fetch(getIpfsURL(articleById.data)).then(res => res.json())
                const article: ArticleType = {
                    authorAddress: articleById.author,
                    authorName: "",
                    authorDesc: "",
                    authorImg: "",
                    title: articleById.title,
                    content: data,
                    coverImg: articleById.image,
                    readTime: 0,
                    createdAt: new Date(parseInt(articleById.createDate) * 1000).toDateString(),
                    id: articleById.id,
                    likes: 0,
                    price: parseInt(articleById.price),
                }
                setShowArticle(true)
                setArticle(article)
            } else {
                if (!user?.addr) {
                    setShowLogin(true)
                    const article: ArticleType = {
                        authorAddress: articleById.author,
                        authorName: "",
                        authorDesc: "",
                        authorImg: "",
                        title: articleById.title,
                        content: { blocks: [] },
                        coverImg: articleById.image,
                        readTime: 0,
                        createdAt: new Date(parseInt(articleById.createDate) * 1000).toDateString(),
                        id: articleById.id,
                        likes: 0,
                        price: parseInt(articleById.price),
                    }

                    setArticle(article)
                    setShowArticle(false)
                } else {
                    const paidArticle = await getPaidArticle(address, user?.addr, articleId)
                    let data: any = { blocks: [] }
                    setShowLogin(false)

                    if (paidArticle) {
                        data = await fetch(getIpfsURL(paidArticle.data)).then(res => res.json())
                        const article: ArticleType = {
                            authorAddress: paidArticle.author,
                            authorName: "",
                            authorDesc: "",
                            authorImg: "",
                            title: paidArticle.title,
                            content: data,
                            coverImg: paidArticle.image,
                            readTime: 0,
                            createdAt: new Date(parseInt(paidArticle.createDate) * 1000).toDateString(),
                            id: paidArticle.id,
                            likes: 0,
                            price: parseInt(paidArticle.price),
                        }
                        setArticle(article)
                        setShowArticle(true)
                    } else {
                        const article: ArticleType = {
                            authorAddress: articleById.author,
                            authorName: "",
                            authorDesc: "",
                            authorImg: "",
                            title: articleById.title,
                            content: { blocks: [] },
                            coverImg: articleById.image,
                            readTime: 0,
                            createdAt: new Date(parseInt(articleById.createDate) * 1000).toDateString(),
                            id: articleById.id,
                            likes: 0,
                            price: parseInt(articleById.price),
                        }

                        setArticle(article)
                    }
                }
            }
            setLoading(false)
        }

        if (author && authorId && !isPreview) {
            if (author.name)
                document.title = `${author.name} - Tales`
            setLoading(true)
            getArticlesByAuthor(authorId)
        }
    }, [author, authorId, isPreview, articleId, user])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if (isAuthorLoading || loading) return <Loader />

    if (article === undefined) return <div className='flex items-center justify-center text-lg'>Article not found</div>

    return (
        <div className="editor">
            <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
                <ArticlePageTopBar
                    article={article}
                    showLogin={showLogin}
                    handlePaidArticle={handlePaidArticle}
                    handleShow={handleShow}
                    user={user} />
                <Article article={article} author={author} showContent={showArticle} />
            </div>
            {
                show &&
                <div>
                    <div onClick={handleClose} className="absolute top-0 left-0 w-screen h-screen"></div>
                    <div className="absolute top-24 right-20">
                        <SubscribeModel onSubscribe={handleClose} authorAddress={article.authorAddress} name={article.authorName} />
                    </div>
                </div>
            }
        </div>
    );
};

function getPrice({ price }: { price: number }) {
    if (price == 0) return <>{"Free to read"}</>
    return <div className='flex flex-row items-center'>{"Pay"} <img src={FlowLogo} className="h-5 w-5 mx-1" /> {`${price}  to read`}</div>
}

type ArticleProps = {
    article: ArticleType | undefined;
    author: Author | undefined;
    showContent: boolean;
}

function Article({ article, author, showContent }: ArticleProps) {
    const navigate = useNavigate();
    const parser = new edjsParser();

    return (
        <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
            <div className="mt-8 flex flex-col items-center">
                {article.coverImg ? (
                    <img
                        className="rounded-lg mb-6 w-[720px] h-[360px] bg-green-900"
                        src={article.coverImg}
                    />
                ) : (
                    <div className="rounded-lg mb-6 w-[720px] h-[360px] bg-green-900"></div>
                )}
            </div>

            <Heading as="h1" level="1" align={"center"} color={"green"}>
                {article.title}
            </Heading>

            <div className="mt-8 flex items-end justify-between w-full space-x-4">
                {author && <div className="flex items-end gap-2">
                    <img className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => navigate(`/${author.address}`)} src={author.img} alt="Author" />
                    <div
                        className="cursor-pointer"
                        onClick={() => navigate(`/${author.address}`)}
                    >
                        <div className="text-gray-600 text-sm font-bold pl-1">
                            {author.name}
                        </div>
                        <Tag hover tone="green" size="small">
                            {author.address}
                        </Tag>
                    </div>
                    <Tag size="small">10 mins read</Tag>
                </div>}
                <Tag size="small">{article.createdAt}</Tag>
            </div>
            {showContent ? (
                <div
                    dangerouslySetInnerHTML={{ __html: parser.parse(article.content) }}
                    className="mt-8 font-Satoshi16px leading-8 text-justify"
                ></div>
            ) : (
                <SkeletonLoader />
            )}
        </div>);
}

type ArticlePageTopBarProps = {
    user: any
    article: ArticleType | undefined;
    handlePaidArticle: () => void;
    showLogin: boolean;
    handleShow: () => void;
}

function ArticlePageTopBar({ user, handlePaidArticle, article, showLogin, handleShow }: ArticlePageTopBarProps) {
    const navigate = useNavigate();
    //const { author: reader } = useReader(user?.addr)

    // useEffect(() => {
    //     console.log("Inside Top Bar : ", reader)
    // }, [reader])

    return (
        <div className="flex justify-between items-center px-8">
            {/* {user && reader && <div onClick={() => navigate(`/dashboard`)} className="w-12 h-12 rounded-full cursor-pointer bg-green-800">
                <img className="w-full h-full" src={reader.img} />
            </div>} */}
            <div className="flex gap-6 ml-auto">
                {
                    !(user?.addr != "" && user?.addr == article.authorAddress) &&
                    <>
                        <Button variant="tertiary" size="small" onClick={handlePaidArticle}>
                            {
                                showLogin ? "Login to read" :
                                    (article?.price > 0) ? article?.content?.blocks?.length ? "Collected Article" : getPrice({ price: article?.price })
                                        : "Read for free"
                            }
                        </Button>
                        <Button variant="primary" size="small" tone="green" onClick={handleShow}>
                            Subscribe
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}

export default ArticlePage;


