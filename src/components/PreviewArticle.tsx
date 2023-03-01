import { Button, Heading, Tag } from 'degen'
import React from 'react'
import { ArticleType, Author } from 'types/types'

// @ts-ignore
import edjsParser from 'editorjs-parser'

export type PreviewArticle = {
    author: Author
    article: ArticleType
}

function PreviewArticle({ author, article}: PreviewArticle) {
    const parser = new edjsParser();

  return (
    <div className="editor">
            <div className="mx-auto pt-6 px-4 sm:px-6 lg:px-8 max-h-screen scroll-auto flex flex-col">
                {/* nav with author photo and name and walletaddress on left and subscribe button on right. */}
                <div className="flex justify-between items-center px-8">
                    <div className="flex items-center space-x-4 cursor-pointer">
                        <img className="w-10 h-10 rounded-full" src={author.img} alt="Author" />
                        <div>
                            <p className="text-gray-800 text-sm font-medium">
                                {author.name}
                            </p>
                            <p className="font-light text-xs">{author.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {
                            <Button variant="primary" size="small" tone="green">
                                Subscribe
                            </Button>
                        }
                    </div>
                </div>

                <div className="max-w-3xl min-w-[50vw] mx-auto py-6">
                    <div className="mt-8 flex flex-col items-center">
                        {
                            article.coverImg ? 
                                <img className="rounded-lg mb-6 w-[720px] h-[360px] bg-green-900" src={article.coverImg} />
                                : <div className="rounded-lg mb-6 w-[720px] h-[360px] bg-green-900"></div>
                        }
                    </div>

                    <Heading as="h1" level="1" align={"center"} color={"green"}>{article.title}</Heading>

                    <div className="mt-8 flex items-center justify-between w-full space-x-4">
                        <div className="flex">
                            <div className="cursor-pointer"
                            >
                                <Tag hover tone="green" size="small">
                                    {author.address}
                                </Tag>
                            </div>
                            <Tag size="small">
                                10 mins read
                            </Tag>
                        </div>
                        <Tag size="small">
                            {article.createdAt}
                        </Tag>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: parser.parse(article.content) }} className="mt-8 font-Satoshi16px text-base leading-8 text-justify">
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PreviewArticle
