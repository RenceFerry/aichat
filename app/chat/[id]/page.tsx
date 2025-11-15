'use client'

import { RiArrowLeftWideFill } from "react-icons/ri";
import { useSession } from "next-auth/react"
import { RiChatAiFill } from "react-icons/ri";
import { GiSettingsKnobs } from "react-icons/gi";
import { AutoResizeTextarea } from "@/components/chatPage/AutoResizeTextarea";
import { useState, useRef, useEffect } from "react";
import  SideMenu  from '@/components/chatPage/sideMenu'
import { AnimatePresence, motion } from "framer-motion";
import React from 'react';
import { IoIosSend } from "react-icons/io";
import { div } from "framer-motion/client";

interface Messages {
  from: "user" | "ai";
  content: string;
}

export default function Page() {
  const { data: session } = useSession();
  const [ showSideMenu, setSideMenu ] = useState(false);
  const [ isMediaQuery, setIsMediaQuery ] = useState(false);
  const [ showSettings, setShowSettings ] = useState(false);
  const [ showProfile, setShowProfile ] = useState(false);
  const [ bottom, setBottom ] = useState("2.5rem");
  const [output, setOutput] = useState("");
  const [ showLogo, setShowLogo ] = useState(true);
  const [ messages, setMessages ] = useState<Messages[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  let keyboardOpen;

  useEffect(() => {
    const checkMediaQuery = () => {
      setIsMediaQuery(window.innerWidth >= 768);
    };
    
    // Initial check
    checkMediaQuery();
    
    // Add resize listener
    window.addEventListener('resize', checkMediaQuery);
    
    keyboardOpen = () => {
      //const bottomPx = window.innerHeight - (window.visualViewport.height || 0);
      setBottom(`${bottom}px`)
    }
    // Cleanup
    return () => window.removeEventListener('resize', checkMediaQuery);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prompt = new FormData(event.currentTarget).get("prompt")?.toString().trim();
    event.currentTarget.reset();
    if (!prompt) return;

    // Add user and empty AI response
    setMessages((prev) => [
      ...prev,
      { from: "user", content: prompt },
      { from: "ai", content: "" }
    ]);

    setShowLogo(false);

    // Send prompt to server
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt })
    });

    if (!res.body) return;

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      // Append chunk to AI's message
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = { ...updated[updated.length - 1] }; // copy object
        lastMsg.content += chunk;
        updated[updated.length - 1] = lastMsg;
        return updated;
      });
    }
  };


  return (
    <div className="flex flex-row h-full w-full relative overflow-hidden" style={{
      '--sidenav-width': 'min(max(40%, 14rem), 24rem)'
    } as React.CSSProperties}>
      {/*sideMenu*/}
      <AnimatePresence>
        <SideMenu isOpen={showSideMenu} user={session?.user} setSettings={[showSettings, setShowSettings]} setProfile={[showProfile, setShowProfile]}/>
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
        className={`flex flex-col h-full relative flex-1 ml-0`}>

        <button type="button" onClick={() => setSideMenu(!showSideMenu)} title="side menu">
          <RiArrowLeftWideFill size={30} className="absolute top-1/2 left-3 bottom-1/2 text-fore hover cursor-pointer "/>
        </button>

        {/* header*/}
        <div className='w-full h-14 flex flex-row justify-between items-center top-0 left-0'>
          <div className="flex items-center ml-7 text-md md:text-2xl">
            <RiChatAiFill size='1.5em' className="text-fore"/>
            <span className="ml-2 font-extrabold text-fore">AI Chat</span>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center mr-7">
            <span className="font-normal text-md md:text-2xl">GPT-4</span>
            <button title="quick settings" type="button">
              <GiSettingsKnobs size={30} className="text-fore rotate-90 hover cursor-pointer"/>
            </button>
          </div>
        </div>

        {/** LOGO */}
        {showLogo ? (
          <div className="flex-1 flex flex-col items-center gap-4 m-auto w-full justify-center">
            <RiChatAiFill size={50} className="text-fore"/>
            <span className="text-3xl font-extrabold self-center text-fore text-center px-8">What's Up {session?.user?.name?.split(' ')[0] || session?.user?.name}?</span>
          </div>
        ) : null}

        {/** chat div */}
        { !showLogo ? (
          <div ref={chatRef} className="mt-8 flex flex-col flex-1 w-full gap-2 flex-start overflow-y-auto msg pb-32">
            {
              messages.map(({from, content}, i) => (
                <div key={i} className={`rounded-3xl text-sm md:text-md p-3 m-4 max-w-[90%] min-w-56 break-words ${from==="user"? "bg-fore text-back self-end rounded-br-none" : "bg-back border border-gray-500 self-start rounded-bl-none"}`}>
                  {content}
                </div>
              ))
            }
          </div>
        ) : null}


        {/* input */}
        <div className={`w-full flex justify-center items-center absolute bottom-[2.5rem]`}>
          <form onSubmit={sendMessage} className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] flex justify-center items-center relative">
            <AutoResizeTextarea 
              className="msg border-[1px] border-gray-600 rounded-md pt-2 px-14 bg-back text-fore w-full"
              placeholder="Ask anything..."
              maxHeight="200px"
              minHeight="50px"
              name="prompt"
              onFocus={keyboardOpen}
            />
            <div className="absolute top-0 right-0 h-full flex justify-center items-center pr-2">
              <button title="submit" type="submit" className="bg-fore w-10 h-10 flex justify-center items-center rounded-md hover"><IoIosSend size={30} className="text-back"/></button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}