import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { demoPost } from "../utils/constants";
import ArticleCard from "../components/Card";
import { Button, Heading, Tag } from "degen";
import { ArticleType } from "types/types";
import { useAuthor } from "hooks/useAuthor";
// @ts-ignore
import edjsParser from 'editorjs-parser'
import SubscribeModel from "components/SubscribeModel";
import { FlowLogo } from "images";


type PostProps = {
    post?: ArticleType;
    isPreview?: boolean
    authorIdForPreview?: string
    articleIdForPreview?: string
};


const Article = ({ post, isPreview = false, authorIdForPreview }: PostProps) => {
    const { authorId, articleId } = useParams() ?? {};
    const { author, isAuthorLoading } = useAuthor(isPreview ? authorIdForPreview : authorId)
    const parser = new edjsParser();
    const navigate = useNavigate()


    const [loading, setLoading] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [article, setArticle] = useState<ArticleType>();
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (isPreview) {
            setArticle(post)
        }
    }, [isPreview, post])


    useEffect(() => {
        const getArticlesByAuthor = async (address: string) => {
            const article = demoPost
            // await fetch(`http://localhost:3000/api/articles?author=${address}`)
            //     .then(res => res.json())
            setArticle(article)
        }
        if (author && author.address && !isPreview) {
            if (author.name)
                document.title = `${author.name} - Tales`

            getArticlesByAuthor(author.address)
        }
    }, [author, isPreview])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if (isAuthorLoading) return <></>
    if (!author?.address || article === undefined) return <div className='flex items-center justify-center text-lg'>Author not found</div>


    return (
        <div className="editor">
            <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
                {/* nav with author photo and name and walletaddress on left and subscribe button on right. */}
                <div className="flex justify-between items-center px-8">
                    <div onClick={() => navigate(`/${author.address}`)} className="flex items-center space-x-4 cursor-pointer">
                        <img className="w-10 h-10 rounded-full" src={author.img} alt="Author" />
                        <div>
                            <p className="text-gray-800 text-sm font-medium">
                                {author.name}
                            </p>
                            <p className="font-light text-xs">{author.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <Button variant="tertiary" size="small" onClick={() => {(post.price > 0) && handleShow()}}>
                            {getPrice({price: post.price})}
                        </Button>
                        <Button variant="primary" size="small" tone="green" onClick={handleShow}>
                            Subscribe
                        </Button>
                    </div>
                </div>

                <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
                    <Heading as="h1" level="1" color={"green"}>{article.title}</Heading>
                    <div className="mt-8">
                        <img className="w-full rounded-lg" src={article.coverImg} alt="Cover" />
                    </div>

                    <div className="mt-8 flex items-center justify-between w-full space-x-4">
                        <div className="flex">
                            <div className="cursor-pointer"
                                onClick={() => navigate(`/${author.address}`)}
                            >
                                <Tag hover tone="green" size="small">
                                    {author.address}
                                </Tag>
                            </div>
                            <Tag size="small">
                                {article.readTime} min read
                            </Tag>
                        </div>
                        <Tag size="small">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </Tag>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: parser.parse(article.content) }} className="mt-8 font-Satoshi16px text-justify">
                    </div>
                </div>

                {/* {
                    !isPreview && <div className="w-screen bg-gray-500">
                        <div className="mt-8 mx-auto max-w-6xl py-20">
                            <h2 className="text-base text-gray-800">More from {article.authorName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {recentPosts.map((post) => (
                                    <ArticleCard
                                        key={post.id}
                                        article={post}
                                        author={author}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                } */}
            </div>
            {
                show && 
                <div>
                    <div onClick={handleClose} className="absolute top-0 left-0 w-screen h-screen"></div>
                    <div className="absolute top-24 right-20">
                        <SubscribeModel onSubscribe={handleClose} name={article.authorName} />
                    </div>
                </div>
            }
        </div>
    );
};

function getPrice({price} : {price: number}) {
    if(price == 0) return <>{"Free to read"}</>
    return <div className='flex flex-row items-center'>{"Pay"} <img src={FlowLogo} className="h-5 w-5 mx-1"/> {`${price}  to read`}</div>
}

export default Article;
