import ArticleCard from 'components/Card'
import { useAuthor } from 'hooks/useAuthor'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Article, Author } from 'types/types'
import { demoAuthor, demoPost } from 'utils/constants'

export type AuthorProps = {
    author: Author
}

function AuthorPage() {
    const recentPosts: Article[] = Array(8).fill(0).map((_, i) => ({ ...demoPost, id: i.toString() }));
    const params = useParams()

    const author = useAuthor(params.id)
    console.log(author)
    if (!author) return <></>
    
    return (
        <div className='flex flex-col scroll-auto'>
            <div className='w-screen h-screen'>
                <div className='h-[40vh] bg-green-800'></div>
                <div className='py-10 bg-gray-100'>
                    <img
                        className='w-32 h-32 rounded-full mx-auto -mt-24 border-4 border-gray-100'
                        src={author.img}
                        alt='Author'
                    />
                    <div className='text-center'>
                        <h1 className='text-2xl font-black text-gray-800'>{author.name}</h1>
                        <p className='text-gray-600 text-sm'>{author.address}</p>
                        <p className='text-gray-600 py-4 text-base'>{author.description}</p>
                    </div>
                </div>
                <div className='my-10 mx-auto w-5/6 py-8 px-4  bg-gray-100 rounded-lg '>
                    <div className='flex justify-between items-center px-8'>
                        <div className='flex flex-col justify-center '>
                            <div>Subscibe to {demoAuthor.name}</div>
                            <div>Receive updates directly in your inbox</div>
                        </div>
                        <div className='flex justify-center'>
                        <input
                            className='w-1/3 px-4 py-2  rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent' />
                        <button className='bg-green-600 text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'>Subscribe</button>
                    </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 w-5/6 mx-auto ">
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
    )
}

export default AuthorPage