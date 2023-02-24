
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Form, Button, Modal } from "react-bootstrap";
import { demoPost } from "../utils/constants";
import ArticleCard from "../components/Card";
// import { CircularProgress } from "@mui/material";

// import { IPFS_GATEWAY } from "./../utils/ipfsStorage";
// import Medium from "../artifacts/contracts/MediumBlog.sol/MediumBlog.json";
// import { contractAddress, networkDeployedTo } from "../utils/contracts-config";
// import networksMap from "../utils/networksMap.json";

export type Article = {
    authorAddress: string;
    authorName: string;
    authorDesc: string;
    authorImg: string;
    title: string;
    content: string;
    coverImg: string;
    readTime: number;
    createdAt: string;
    id: string;
    likes: number;
}


const Post = () => {
    const { id } = useParams();
    //   const data = useSelector((state) => state.blockchain.value);

    const [loading, setLoading] = useState(false);
    const [tipAmount, setTipAmount] = useState(0);
    const [recentPosts, setRecentPosts] = useState<Article[]>([demoPost]);
    const [article, setPost] = useState<Article>(demoPost);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        // a medium like article page with title, author, content, cover image, read time, etc.
        <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mt-12">{article.title}</h1>
            <div className="flex items-center mt-4">
                <img className="w-10 h-10 rounded-full mr-2" src={article.authorImg} alt="Author" />
                <div>
                    <p className="text-gray-800 font-medium">
                        {article.authorName} 
                        <span className="material-icons text-base">
                            open_in_new
                        </span>
                    </p>
                    <p className="text-gray-600">{article.authorDesc}</p>
                </div>
            </div>
            <div className="mt-8">
                <img className="w-full rounded-lg" src={article.coverImg} alt="Cover" />
            </div>
            <div className="mt-8 font-Satoshi16px text-justify">
                {article.content}
            </div>
            // like and subscribe buttons
            <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full">
                        {article.readTime} min read
                    </button>
                    <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full">
                        {article.likes} Likes
                    </button>
                    {/* <button className="bg-blue-600 text-white py-2 px-4 rounded-full">  */}
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={handleShow}>
                        Tip
                    </button>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={handleShow}>
                        Subscribe
                    </button>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={handleShow}>
                        Follow
                    </button>
                </div>
            </div>
            // recent posts
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {recentPosts.map((post) => (
                        <ArticleCard
                            key={post.id}
                            article={post}
                            />
                    ))}
                </div>
            </div>
        </div>




    );
};

export default Post;
