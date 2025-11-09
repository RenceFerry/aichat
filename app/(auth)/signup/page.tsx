'use client'

import { RiChatAiFill } from "react-icons/ri";
import { signIn } from 'next-auth/react'
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link';
import { useActionState } from 'react';
import { signUpAction } from '@/api/action';


export default function Page() {
  const [state, signUp, pending] = useActionState(signUpAction, undefined);

  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div>
        <Link href={'/'}>
          <div className='text-2xl text-fore font-extrabold flex flex-col items-center gap-2 hover'>
            <RiChatAiFill size='1.5em' className="text-fore"/>
            <h1>AI Chat</h1>
          </div>
        </Link>
        <form className='min-w-52' action={signUp}>
          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="name">Username</label>
            <input className='h-10 p-2 md:w-96 border-[1px] border-gray-600 rounded-md bg-back text-fore' placeholder='your name' type="text" id="name" name="name" />
            <p className='text-red-400 font-normal'>
              {
                state?.errors?.properties?.name?.errors && state.errors.properties.name.errors[0]           
              }
            </p>
          </div>

          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="email">Email</label>
            <input className='h-10 p-2 md:w-96 border-[1px] border-gray-600 rounded-md bg-back text-fore' placeholder='you@example.com' type="email" id="email" name="email" />
            <p className='text-red-400 font-normal'>
              {
                state?.errors?.properties?.email?.errors && state.errors.properties.email.errors[0]
              }
            </p>
          </div>

          <div className='my-4 flex flex-col gap-2 text-fore'>
            <label className='font-semibold' htmlFor="password">Password</label>
            <input className='h-10 p-2 border-[1px] border-gray-600 rounded-md bg-back text-fore md:w-96' placeholder='••••••' type="password" id="password" name="password" />
            <p className='text-red-400 font-normal'>
              {
                state?.errors?.properties?.password?.errors && state.errors.properties.password.errors[0]
              }
            </p>
          </div>

          <div>
            <button className='rounded-md h-10 my-3 w-full wd:w-96 flex items-center justify-center bg-blue-500 text-semibold text-white hover' type='submit' disabled={pending}>
              Sign Up
            </button>
          </div>

          <div className='flex flex-row items-center'>
            <div className='flex-1 mr-1 h-[1px] bg-gray-700'></div>
            <span className='text-gray-500 text-sm'>OR</span>
            <div className='flex-1 ml-1 h-[1px] bg-gray-700'></div>
          </div>
          
          <div>
            <button
              type="button" className='my-3 h-10 w-full flex items-center justify-center rounded-md bg-fore text-back hover' 
              onClick={() => signIn('google', {callbackUrl: '/'}) }
            >
              <FaGoogle className='inline mr-2' />
              Continue with Google
            </button> 
          </div>
          {
            state?.message &&
            <p className='text-red-400 font-normal'>{state.message}</p>
          }
          <span className='text-normal text-sm text-gray-400'>Already have an account? <Link className='text-blue-400' href='/login'>Log in</Link></span>
        </form>

      </div>
    </div>
  );
}