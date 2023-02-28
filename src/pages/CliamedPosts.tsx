import Article from 'components/ClaimedArticle'
import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import React, { useEffect } from 'react'
import { ArticleType } from 'types/types'
import { demoPost } from 'utils/constants'
import useCurrentUser from 'hooks/useCurrentUser'
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import GetClaimedPosts from '../cadence/scripts/GetClaimedPosts.cdc'

function ClaimedPosts() {
  const user = useCurrentUser()

  const [claimedPosts, setClaimedPosts] = React.useState<ArticleType[]>([])

  useEffect(() => {
    const fetchClaimedPosts = async (address: string) => {
      let res;
      try {
        res = await fcl.query({
          cadence: GetClaimedPosts,
          args: (arg: any, t: any) => [arg(address, t.Address)]
        })
      } catch(e) { res = []; console.log(e) }
      console.log("Res: ", res)
      return res
    }

    const getClaimedPosts = async (address: string) => {
      const articles = await fetchClaimedPosts(address)

      const myArticles: ArticleType[] = await Promise.all(articles.map(async (a: any) => {
        let p = a.data as string

        // const data: any = await fetch(p.replace("ipfs.io", "nftstorage.link")).then(res => res.json())

        // pub let id: UInt64
        // pub let serial: UInt64
        // pub let author: Address
        // pub let postId: UInt64
        // pub let postPrice: UFix64
        // pub let postTitle: String
        // pub let postImage: String
        // pub let postCreateDate: UFix64
        // pub let dateReceived: UFix64
        return Promise.resolve({
          authorAddress: a.author,
          authorName: "",
          authorDesc: "",
          authorImg: "",
          title: a.postTitle,
          content: "",
          coverImg: a.image,
          readTime: 0,
          createdAt: new Date(parseInt(a.dateReceived) * 1000).toDateString(),
          id: a.id,
          likes: 0,
          price: Number(a.postPrice),
        })
      }))
      setClaimedPosts(myArticles)
    }
    if (user && user?.addr != "") getClaimedPosts(user?.addr)

  }, [user?.addr])
  
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
            {
                claimedPosts.map((post, i) => {
                    return <Article key={i} article={post} />
                })
            }
            </div>
            
        </div>
    </BodyLayout>
  )
}

export default ClaimedPosts
