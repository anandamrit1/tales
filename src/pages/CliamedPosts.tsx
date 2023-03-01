import Article from 'components/ClaimedArticle'
import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import React, { useEffect } from 'react'
import { ArticleType } from 'types/types'
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

      //   {
      //     "id": "136710733",
      //     "serial": "1",
      //     "author": "0xdb86c6c5e0c5b077",
      //     "postId": "136710183",
      //     "postPrice": "10.00000000",
      //     "postTitle": "Hello Testnet - Paid",
      //     "postImage": "https://ipfs.io/ipfs/QmVaAFxVScCb7cZoWJf8QX4Rrv9NTAf7S3bYyfXk5M6Vcr",
      //     "postCreateDate": "1677612139.00000000",
      //     "dateReceived": "1677612540.00000000"
      // }

        return Promise.resolve({
          authorAddress: a.author,
          authorName: "",
          authorDesc: new Date(parseInt(a.postCreateDate) * 1000).toLocaleDateString(),
          authorImg: "",
          title: a.postTitle,
          content: "",
          coverImg: a.postImage,
          readTime: 0,
          createdAt: new Date(parseInt(a.dateReceived) * 1000).toLocaleDateString(),
          id: a.postId,
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