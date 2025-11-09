'use client'

import { RiArrowLeftWideFill } from "react-icons/ri";
import { useSession } from "next-auth/react"
import { RiChatAiFill } from "react-icons/ri";
import { GiSettingsKnobs } from "react-icons/gi";
import { AutoResizeTextarea } from "@/components/chatPage/AutoResizeTextarea";
import { useState, useRef, useEffect } from "react";
import  SideMenu  from '@/components/chatPage/sideMenu'
import { AnimatePresence, motion } from "framer-motion";

export default function Page() {
  const { data: session } = useSession();
  const [ showSideMenu, setSideMenu ] = useState(false);
  const [ isMediaQuery, setIsMediaQuery ] = useState(false);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ showProfile, setShowProfile ] = useState(false);


  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMediaQuery(window.innerWidth >= 768);
    };
    
    // Initial check
    checkMediaQuery();
    
    // Add resize listener
    window.addEventListener('resize', checkMediaQuery);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMediaQuery);
  }, []);

  return (
    <div className="flex flex-row h-screen w-full relative overflow-hidden" style={{
      '--sidenav-width': 'min(max(40%, 14rem), 24rem)'
    } as React.CSSProperties}>
      {/*sideMenu*/}
      <AnimatePresence>
        {<SideMenu isOpen={showSideMenu} user={session?.user} setSettings={[showSettings, setShowSettings]} setProfile={[showProfile, setShowProfile]}/>}
      </AnimatePresence>

      <motion.div 
        onClick={() => {
          if (showSideMenu && !isMediaQuery) setSideMenu(false);
          setShowSettings(false);
          setShowProfile(false);
        }}
        animate={{ 
          marginLeft: showSideMenu && isMediaQuery ? "var(--sidenav-width)" : "0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex flex-col h-full justify-between relative flex-1 ml-0`}>

        <button onClick={() => setSideMenu(!showSideMenu)}>
          <RiArrowLeftWideFill size={30} className="absolute top-1/2 left-3 bottom-1/2 text-fore hover cursor-pointer "/>
        </button>

        {/* header*/}
        <div className='w-full h-14 flex flex-row justify-between items-center'>
          <div className="flex items-center ml-7 text-sm md:text-xl">
            <RiChatAiFill size='1.5em' className="text-fore"/>
            <span className="ml-2 font-extrabold text-fore">AI Chat</span>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center mr-7">
            <span className="font-normal text-sm">GPT-4</span>
            <button>
              <GiSettingsKnobs size={20} className="text-fore rotate-90 hover cursor-pointer"/>
            </button>
          </div>
        </div>
        {/* logo */}
        <div className="flex flex-col items-center gap-4 m-auto">
          <RiChatAiFill size={50} className="text-fore"/>
          <span className="text-3xl font-extrabold self-center text-fore text-center px-8">What's Up {session?.user?.name?.split(' ')[0] || session?.user?.name}?</span>
        </div>

        {/* input */}
        <div className="w-full flex justify-center items-center mb-10">
          <form action="" className="w-full flex justify-center items-center">
            <AutoResizeTextarea 
              className="msg border-[1px] border-gray-600 rounded-md pt-2 px-14 bg-back text-fore w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]"
              placeholder="Ask anything..."
              maxHeight="200px"
              minHeight="50px"
            />
          </form>
        </div>
      </motion.div>
    </div>
  );
}