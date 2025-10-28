'use client'

import { signIn } from '@/../auth'
import { RiChatAiFill } from "react-icons/ri";


export default function Page() {

  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div>
        <div className='text-2xl text-fore font-extrabold flex flex-col items-center gap-2'>
          <RiChatAiFill size='1.5em' className="text-fore"/>
          <h1>AI Chat</h1>
        </div>
        <form className='min-w-52' action="">
          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="email">Email</label>
            <input className='h-10 p-2 w-full border-[1px] border-gray-500 rounded-md bg-back text-fore' placeholder='you@example.com' type="email" id="email" name="email" />
          </div>
          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="password">Password</label>
            <input className='h-10 p-2 w-full border-[1px]  border-gray-500 rounded-md bg-back text-fore' placeholder='12345678' type="password" id="password" name="password" />
          </div>
          <div>
            <button
              type="button"
            >
              Continue with Google
            </button> 
          </div>
        </form>

      </div>
    </div>
  );
}