import React from 'react'

export type SubscribeModelProps = {
    name: string, 
    onSubscribe: () => void
}

function SubscribeModel({name, onSubscribe} : SubscribeModelProps) {
    const [email, setEmail] = React.useState<string>('')

    const handleSubscribe = () => {
        console.log(email)
        onSubscribe()
    }

  return (
    <div>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col bg-white-100 rounded-lg w-96 h-60 p-6">
                <p className="text-xl font-black ">Subscribe to <span className="text-green-900">{name}</span></p>
                <input onChange={(e) => setEmail(e.target.value)} className="px-4 py-3 rounded-lg outline-none border-[1px] border-gray-300 mt-8" type="text" placeholder="Enter your email" />
                <button onClick={handleSubscribe} className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer mt-4">Subscribe</button>
            </div> 
        </div> 
    </div>
  )
}

export default SubscribeModel
