
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { demoPost } from "../utils/constants";
import ArticleCard from "../components/Card";
import { Button, Heading, Tag } from "degen";
import { Article } from "types/types";
import { useAuthor } from "hooks/useAuthor";
// @ts-ignore
import edjsParser from 'editorjs-parser'

type PostProps = {
    post?: Article;
    isPreview?: boolean
};

const Post = ({ post, isPreview=false }: PostProps) => {
    const { authorId, articleId } = useParams();

    const author = useAuthor(authorId)
    const parser = new edjsParser();

    //   const data = useSelector((state) => state.blockchain.value);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [recentPosts, setRecentPosts] = useState<Article[]>([demoPost]);
    const [article, setPost] = useState<Article>(post ?? demoPost);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (!author) return <></>

    return (
        <div className="editor">
            <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
                {/* nav with author photo and name and walletaddress on left and subscribe button on right. */}
                <div className="flex justify-between items-center px-8">
                    <div onClick={() => navigate(`/${article.authorAddress}`)} className="flex items-center space-x-4 cursor-pointer">
                        <img className="w-10 h-10 rounded-full" src={article.authorImg} alt="Author" />
                        <div>
                            <p className="text-gray-800 text-sm font-medium">
                                {article.authorName}
                            </p>
                            <p className="font-light text-xs">{article.authorAddress}</p>
                        </div>
                    </div>
                    <Button variant="primary" size="small" tone="green" onClick={handleShow}>
                        Subscribe
                    </Button>
                </div>

                <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
                    <Heading as="h1" level="1" color={"green"}>{article.title}</Heading>
                    <div className="mt-8">
                        <img className="w-full rounded-lg" src={article.coverImg} alt="Cover" />
                    </div>

                    <div className="mt-8 flex items-center justify-between w-full space-x-4">
                        <div className="flex">
                            <div className="cursor-pointer"
                                onClick={() => navigate(`/${article.authorAddress}`)}
                            >
                                <Tag hover tone="green" size="small">
                                    {article.authorAddress}
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

                {
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
                }

            </div>
        </div>



    );
};

export default Post;
