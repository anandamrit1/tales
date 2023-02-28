import Article from 'components/ClaimedArticle'
import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import React from 'react'
import { ArticleType } from 'types/types'
import { demoPost } from 'utils/constants'
import { Heading } from 'degen'


function ClaimedPosts() {
  return (
    <BodyLayout>
        <SideNav selectedTab='Claimed' />
        <div className='flex flex-col p-4 w-full items-center'>
            
            <div className='flex flex-col items-center w-full h-full gap-4 overflow-scroll'>
            <h1 className='font-black text-[48px] text-green-900 mb-7 w-[840px] font-Satoshi16px text-left'>
            {/* <div className="flex flex-row">
                        <Heading as="h1" level="1" color={"black"}>{"Your"}</Heading>
                        <Heading as="h1" level="1" color={"green"}>{" Claimed Posts"}</Heading>
              </div> */}
                <span className='text-black-100 font-normal'>Your</span> Claimed Posts
            </h1>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            <Article article={demoPost as ArticleType}/>
            </div>
            
        </div>
    </BodyLayout>
  )
}

export default ClaimedPosts
