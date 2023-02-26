// a blog editor page with a preview of the article on the right side
// this page is only accessible to logged in users
// the user can write the article in markdown and preview it on the right side
// the user can also add a cover image and tags to the article
// uses react-tapable-editor for the editor
// uses react-markdown for the preview

import React, { useState } from 'react';
import { BodyLayout } from 'components/BodyLayout';
import { useNavigate } from 'react-router-dom';
import { Article } from 'types/types';
import { demoAuthor, demoPost } from 'utils/constants';
import EditorTools from 'components/EditorTools';
import Post from './Post';

function Editor() {
    const navigate = useNavigate();
    const user = demoAuthor;
    const [ article, setArticle ] = useState<Article>(demoPost);
    const [ isPreview, setIsPreview ] = useState(false);
    const [blogData, setBlogData] = React.useState<string>("")

    const handleCreateArticle = async () => {
        const newArticle: Article = {
            authorAddress: user.address,
            authorName: user.name,
            createdAt: new Date().toISOString(),
            authorDesc: user.description,
            authorImg: user.img,
            content: article.content,
            coverImg: article.coverImg,
            id: '123',
            likes: 0,
            readTime: 10,
            title: article.title,
        }
        console.log(newArticle)
    }

    if (isPreview) {
        const article: Article = {
            authorAddress: user.address,
            authorName: user.name,
            createdAt: new Date().toISOString(),
            authorDesc: user.description,
            authorImg: user.img,
            content: blogData,
            coverImg: "",
            id: '123',
            likes: 0,
            readTime: 10,
            title: "Title",
        }

        return <div>
            <div className='flex w-screen'>
                {/* add author img and name on top left corner and publish button on top right */}
                <div className='flex p-4 justify-between'>
                    <h2>Preview</h2>
                    <span className='material-icons self-center hover:bg-gray-100 p-2 cursor-pointer rounded-full'>cross</span>
                </div>
                <Post post={article}/>
            </div>
        </div>
    }
    return (
        <BodyLayout>
            {/* add author img and name on top left corner and publish button on top right */}
            
            <div className="flex flex-col items-center">
                <div className='w-screen p-4 flex justify-between'>
                    <div className='flex items-center'>
                        <img src={user.img} alt={user.name} className='w-10 h-10 rounded-full' />
                        <p className='px-2'>{user.name}</p>
                    </div>
                    <div className='flex gap-8'>
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-6 rounded-lg cursor-pointer"
                            onClick={() => setIsPreview(true)}
                        >
                            Preview
                        </button>
                        <button
                            className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
                            onClick={handleCreateArticle}
                        >
                            Publish
                        </button>
                    </div>
                    
                </div>
                <div className='w-1/2 mb-10'>
                    <div
                        className='max-w-screen-md text-7xl overflow-auto text-green-900 bg-gray-50 focus:outline-none'
                        contentEditable
                    />
                </div>
                <EditorTools onChange={(data) => setBlogData(data)}/>
            </div>
        </BodyLayout>
    )
}

export default Editor;