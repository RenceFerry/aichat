'use client'

import { signIn } from 'next-auth/react'
import { RiChatAiFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useActionState } from 'react';
import { signInAction } from '@/api/action';

export default function Page() {
  const [state, signInFunc, pending] = useActionState(signInAction, undefined);

  const Reset = () => {}

  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div>
        <Link href={'/'}>
          <div className='text-2xl text-fore font-extrabold flex flex-col items-center gap-2 hover'>
            <RiChatAiFill size='1.5em' className="text-fore"/>
            <h1>AI Chat</h1>
          </div>
        </Link>
        <form className='w-60 md:w-96' action={signInFunc}>
          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="email">Email</label>
            <input className='h-10 p-2 w-60 md:w-96 border-[1px] border-gray-600 rounded-md bg-back text-fore' placeholder='you@example.com' type="email" id="email" name="email" />
            <p className='text-red-400 font-normal'>
              {
                state?.errors?.properties?.email?.errors && state.errors.properties.email.errors[0]
              }
            </p>
          </div>

          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="password">Password</label>
            <input className='h-10 p-2 w-60 border-[1px] border-gray-600 rounded-md bg-back text-fore md:w-96' placeholder='••••••' type="password" id="password" name="password" />
            <p className='text-red-400 font-normal'>
              {
                state?.errors?.properties?.password?.errors && state.errors.properties.password.errors[0]
              }
            </p>
          </div>

          <div>
            <button className='rounded-md w-60 h-10 my-3 w-full md:w-96 flex items-center justify-center bg-blue-500 text-semibold text-white hover' type='submit' disabled={pending}>
              Log In
            </button>
          </div>

          <div className='flex flex-row items-center'>
            <div className='flex-1 mr-1 h-[1px] bg-gray-700'></div>
            <span className='text-gray-500 text-sm'>OR</span>
            <div className='flex-1 ml-1 h-[1px] bg-gray-700'></div>
          </div>
          
          <div>
            <button
              type="button" className='my-3 w-60 h-10 w-full flex items-center justify-center rounded-md md:w-96 bg-fore text-back hover' 
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <FaGoogle className='inline mr-2' />
              Continue with Google
            </button> 
          </div>
          {
            state?.message && 
            <p className='text-red-400 font-normal'>{state.message}</p>
          }
          <span className='text-normal text-sm text-gray-400'>Don't have an account? <Link className='text-blue-400' href='/signup'>Sign up</Link></span>
          <br />
          <span className='text-normal text-sm text-gray-400'>Forgot password? <span className='text-blue-400' onClick={Reset}>Reset</span></span>
        </form>

      </div>
    </div>
  );
}