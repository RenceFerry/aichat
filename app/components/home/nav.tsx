'use client';

import { RiChatAiFill } from "react-icons/ri";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/ui/ui';

export default function Nav() {
  const [show, setShow] = useState(false);

  return ( 
    <div className="h-14 m-0 p-0 w-full relative flex items-center justify-start md:justify-around h-20">
      <div className="flex items-center ml-7 text-lg md:text-xl md:m-0">
        <RiChatAiFill size='1.5em' className="text-fore"/>
        <span className="ml-2 font-extrabold text-fore">AI Chat</span>
      </div>

      <div className={` ${show?'flex':'hidden'}
        flex flex-col absolute right-0 top-0 min-h-40 w-[50%]
        border-b border-l border-fore rounded-lg py-16 px-3 bg-back gap-4
        md:border-none md:p-0 md:h-full md:m-0 md:relative md:flex md:flex-row md:justify-around
      `}>

        <div className="flex flex-1 items-center justify-evenly gap-2 font-normal text-sm flex-wrap md:h-full md:text-md md:flex-nowrap">
          <Link href="/">
            <span className="hover">About</span>
          </Link>
          <Link href="/">
            <span className="hover">Demo</span>
          </Link>
          <Link href="/">
            <span className="hover">Contact</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-evenly gap-3 font-semibold text-sm flex-wrap md:h-full md:text-md md:flex-nowrap">
          <Button className="border-2 border-fore bg-back text-fore flex items-center w-20 justify-center h-8 px-2 hover rounded-lg" children={
            <Link href={'/'}>
              <span >Github</span>
            </Link>
          }/>
          <Button className="flex items-center bg-blue-500 text-white w-20 justify-center h-8 px-2 rounded-lg hover" children={
            <Link href={'/'}>
              <span >Log in</span>
            </Link>
          }/>
          <Button className="text-back bg-fore flex items-center w-20 justify-center h-8 px-2 rounded-lg hover" children={
            <Link href={'/'}>
              <span >Sign up</span>
            </Link>
          }/>
            
        </div>
      </div>

      <div className="absolute right-3 h-full flex items-center md:hidden hover" onClick={()=>setShow(!show)}>
          <Button 
            children={
              <>
                <motion.span animate={show? {rotate: 45, y: 10} : {rotate: 0, y: 0}}
                  transition={{duration: 0.3}}
                  className="block h-0.5 w-full bg-fore"
                />

                <motion.span animate={show? {opacity: 0} : {opacity: 1}}
                  transition={{duration: 0.3}}
                  className="block h-0.5 w-full bg-fore"
                />

                <motion.span animate={show? {rotate: -45, y: -12} : {rotate: 0, y: 0}}
                  transition={{duration: 0.3}}
                  className="block h-0.5 w-full bg-fore"
                />
              </>
            }
            className='flex flex-col justify-between h-6 w-8'
          />
        </div>
    </div>
  );
}