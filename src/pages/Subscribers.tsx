import { BodyLayout } from 'components/BodyLayout'
import SideNav from 'components/SideNav'
import React from 'react'


function Subscribers() {
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
