import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import useCurrentUser from 'hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { getSubscribersEndpoint } from 'utils/constants'


function Subscribers() {
  const [subsribers, setSubscribers] = React.useState<any[]>()
  const user = useCurrentUser()
  
  useEffect(() => {
    const getSubscribers = async (address: string) => {
      try {
          const res = await fetch(`${getSubscribersEndpoint}?authorAddress=${address}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const data = await res.json()
          console.log(data)
      } catch(e) {
          console.log(e)
      } 
    }

    if (user && user?.addr) {
        getSubscribers(user?.addr)
    }
  }, [user])

  return (
    <BodyLayout>
        <SideNav selectedTab='Subscribers' />
        <div className='flex flex-col p-4'>
            <h1 className='text-bold text-green-900'>
                Subscribers
            </h1>
        </div>
    </BodyLayout>
  )
}

export default Subscribers
