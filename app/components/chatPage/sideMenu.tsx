'use client'

import { FaPlus } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SideSettings from "@/components/chatPage/sideSettings"
import { ThemeToggler } from "@/components/home/themeToggler";
import { sideProfileProps, sideSettingsProps } from "@/ui/ui";
import {useEffect} from "react";
import React from 'react';

interface SideMenuProps {
  user: any;
  isOpen?: boolean;
  setSettings: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  setProfile: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const SideMenu = ({ user, isOpen = true, setSettings, setProfile }: SideMenuProps) => {
  const [ showSettings, setShowSettings ] = setSettings;
  const [ showProfile, setShowProfile ] = setProfile;
  const sideProfile = {...sideProfileProps};
  const sideSettings = {...sideSettingsProps};
  sideSettings.isOpen = showSettings;
  sideProfile.isOpen = showProfile;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`flex flex-col sidenav h-full border border-transparent border-r-gray-500 bg-back top-0 left-0 absolute z-10`}
        >
          {/*side settings */}
          <AnimatePresence>
            <SideSettings props={sideProfile} />
          </AnimatePresence>
          <AnimatePresence>
            <SideSettings props={sideSettings} />
          </AnimatePresence>

          {/* side header */}
          <div className="flex w-full h-14 flex-row items-center justify-between">
            <div className="flex items-center h-full w-48 ml-4 overflow-hidden">
              <span className="font-extrabold text-md md:text-xl text-fore truncate">Home Workspace</span>
            </div>
            <div className="flex flex-row items-center gap-3">
              {
                user?.image && 
                <button onClick={() => {setShowProfile(!showProfile); setShowSettings(false)}} className="hover h-full w-[30px]">
                  <Image 
                    src={user.image} 
                    alt="user profile picture" 
                    width={30} 
                    height={30} 
                    className="rounded-full"
                  />
                </button>
              }
              <div className="hover flex justify-center items-center mr-5">
                  <button className="hover" onClick={() => {setShowProfile(false); setShowSettings(!showSettings)}}>
                  <GoGear size={30} className="text-fore"/>
                </button>
              </div>
            </div>
          </div>
          
          {/* side chats buttons */}  
          <div className="flex flex-col items-center gap-3 w-full">
            <button className="flex flex-row justify-center items-center w-11/12  rounded-md text-back bg-fore hover:bg-fore gap-3 h-8 md:h-10">
              <FaPlus size={18} className="text-back"/>
              <span className="font-normal text-md md:text-lg">New Chat</span>
            </button>

            <input type="search" placeholder="Search Chats..." name="search" id="search" className="w-11/12 p-2 rounded-md border border-zinc-500 bg-back text-fore h-8 md:h-10"/>
          </div>
          <ThemeToggler/>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SideMenu 