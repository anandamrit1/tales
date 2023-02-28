import React from 'react'
import { BodyLayout } from './BodyLayout'
import SideNav from './SideNav'
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import CreateFindProfile from '../cadence/transactions/CreateFindProfile.cdc'
import { subscribeTxStatus } from 'utils/subscribeTxStatus'

function RegisterProfile() {
    const [userName, setUserName] = React.useState("")

    const handleRegister = async() => {
        try {
            const txId = await fcl.mutate({
                cadence: CreateFindProfile,
                args: (arg: any, t: any) => [arg(userName, t.String)],
                limit: 7000,
            })
            subscribeTxStatus(txId)
        } catch (error) {
            console.error(error)
        }
    }

  return (
        <BodyLayout>
            <SideNav selectedTab="Articles"/>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='flex flex-col bg-white-100 rounded-lg w-1/3 h-60 p-6'>
                    <p className='text-xl font-black '>Register your <span className='text-green-900'>profile</span></p>
                    <input onChange={(e) => setUserName(e.target.value)} className='px-4 py-3 rounded-lg outline-none border-[1px] border-gray-300 mt-8' type="text" placeholder="Enter your name" />
                    <button onClick={() => handleRegister()} disabled={userName === ""} className='bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer mt-4'>Submit</button>
                    <p className='text-sm text-gray-400 mt-4 text-center'>We integrate with <span className='font-bold text-green-900'>.find</span> profiles</p>
                </div>
            </div>
        </BodyLayout>
  )
}

export default RegisterProfile
