// a blog editor page with a preview of the article on the right side
// this page is only accessible to logged in users
// the user can write the article in markdown and preview it on the right side
// the user can also add a cover image and tags to the article
// uses react-tapable-editor for the editor
// uses react-markdown for the preview

import React, { useEffect, useRef, useState } from 'react';
import { BodyLayout } from 'components/BodyLayout';
import { useNavigate } from 'react-router-dom';
import { ArticleType, ArticleForIPFS } from 'types/types';
import { demoPost } from 'utils/constants';
import EditorTools from 'components/EditorTools';
import Post from './Article';
// @ts-ignore
import edjsParser from 'editorjs-parser'
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import CreateArticle from '../cadence/transactions/CreateArticle.cdc'

import '../styles/editor.css'
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { OutputData } from '@editorjs/editorjs';
import { handleUploadJsonToIpfs } from 'utils/uploadJsonToIpfs';
import { useAuthor } from 'hooks/useAuthor';
import useCurrentUser from 'hooks/useCurrentUser';
import PaymentModel from 'components/PaymentModel';
import { FlowLogo } from 'images';
import ContentEditable from 'react-contenteditable';
import { subscribeTxStatus } from 'utils/subscribeTxStatus';
import Loader from 'components/Loader';
import { CoverImage } from 'components/CoverImage';
import { handleUploadFileToIPFS } from 'utils/uploadFileToIpfs';

const titleState = atom<string>({
    key: 'titleState',
    default: "",
  });
  
function Editor() {
    const navigate = useNavigate();
    const user = useCurrentUser();
    
    const { author } = useAuthor(user?.addr);
    const titleStateValue = useRecoilValue(titleState)

    const titleValue = useRef(titleStateValue);

    const [image, setImage] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const [ article, setArticle ] = useState<ArticleType>(demoPost);
    const [ title, setTitle] = useRecoilState<string>(titleState)
    const [ isPreview, setIsPreview ] = useState(false);
    const [blogData, setBlogData] = React.useState<OutputData>()
    const [price, setPrice] = useState<number>(0)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePriceChange = (val : number) => {
        setPrice(val)
        handleClose()
    }

    const handleTitleChange = (e: any) => {
        titleValue.current = e.target.value
        setTitle(e.target.value)
    }

    const handleCreateArticle = async () => {
        let ipfsImageHash = ""
        try {
            if (image) {
                setLoading(true)
                ipfsImageHash = await handleUploadFileToIPFS(image, new Date().toTimeString())
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

        let ipfsHash = ""
        try {
            setLoading(true)
            ipfsHash = await handleUploadJsonToIpfs(blogData)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

        const newArticle: ArticleForIPFS = {
            authorAddress: author.address,
            authorName: author.name,
            createdAt: new Date().toISOString(),
            authorDesc: author.description,
            authorImg: author.img,
            content: ipfsHash,
            coverImg: article.coverImg,
            id: '123',
            likes: 0,
            readTime: 10,
            title: article.title,
            price: price
        }
        
        try {
            const transactionId = await fcl.mutate({
                cadence: CreateArticle,
                args: (arg: any, t: any) => [arg(title, t.String), 
                                   arg(author?.description, t.String), 
                                   arg(ipfsImageHash == "" ? "" : `https://ipfs.io/ipfs/${ipfsImageHash}`, t.String), 
                                   arg(price.toFixed(1).toString(), t.UFix64), 
                                   arg(`https://ipfs.io/ipfs/${ipfsHash}`, t.String)]
              })
              titleValue.current = ""
              subscribeTxStatus(transactionId, navigate)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    if (isPreview) {
        const article: ArticleType = {
            authorAddress: author?.address,
            authorName: author?.name,
            createdAt: new Date().toISOString(),
            authorDesc: author?.description,
            authorImg: author?.img,
            content: blogData,
            coverImg: "",
            id: '123',
            likes: 0,
            readTime: 10,
            title: title,
            price: price
        }

        return <div>
            <div className='flex flex-col w-screen'>
                {/* add author img and name on top left corner and publish button on top right */}
                <div className='flex p-4 justify-between bg-green-400 sticky top-0'>
                    <h2>Preview</h2>
                    <span onClick={() => setIsPreview(false)} className='material-icons self-center hover:bg-green-600 p-2 cursor-pointer rounded-full'>close</span>
                </div>
                <Post authorIdForPreview={author.address} isPreview post={article}/>
            </div>
        </div>
    }

    if (loading) return <Loader />

    return (
        <BodyLayout>
            {/* add author img and name on top left corner and publish button on top right */}
            
            <div className="flex flex-col items-center">
                <div className='w-screen p-4 flex justify-between'>
                    <div className='flex items-center'>
                        <img src={author?.img} alt={author?.name} className='w-10 h-10 rounded-full' />
                        <p className='px-2'>{author?.name}</p>
                    </div>
                    <div className='flex'>
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-6 rounded-lg cursor-pointer"
                            onClick={() => setIsPreview(true)}
                        >
                            Preview
                        </button>
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-6 flex flex-row items-center rounded-lg cursor-pointer mx-3 align-middle"
                            onClick={handleShow}
                        >
                            Price: {price == 0 ? " Free" : <div className='flex flex-row ml-1 items-center'>{price} <img src={FlowLogo} className="h-5 w-5 ml-1"/></div>}
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
                    <CoverImage setImage={setImage} />
                    <ContentEditable
                        id='blog-title-editor'
                        className='title-class mt-10 cursor-text max-w-screen-md text-7xl font-black text-center overflow-auto bg-gray-50 focus:outline-none'
                        html={titleValue.current} 
                        placeholder="Enter Title"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const editor = document.getElementById('blog-title-editor');
                            }
                        }}
                        onChange={handleTitleChange} />
                </div>
                <EditorTools onChange={(data) => setBlogData(data)}/>
            </div>
            {
                show && 
                <div>
                    <div onClick={handleClose} className="absolute top-0 left-0 w-screen h-screen"></div>
                    <div className="absolute top-20 right-4 z-50">
                        <PaymentModel onSubscribe={handlePriceChange} priceInitial={price} />
                    </div>
                </div>
            }
        </BodyLayout>
    )
}

export default Editor;