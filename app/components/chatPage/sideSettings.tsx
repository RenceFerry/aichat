'use client'

import { AnimatePresence, motion } from "framer-motion";
import { SideType } from "@/ui/ui";
import { useState } from "react";
import React from "react";

const SideSettings = ({ props: {title, isOpen, sub, tabs} }: { props: SideType }) => {
  const [ tabShown, setTabShown ] = useState("Profile");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{x: "-100%"}}
        animate={{x: "0%"}}
        exit={{x: "-100%"}}
        transition={{type: "tween"}}
        className="flex fle-row w-full h-full border border-transparent border-r-gray-500 bg-back top-0 left-0 absolute z-20">
          <div className="h-full w-full flex flex-col items-center m-3 md:m-5 gap-3 justify-start">

            {/* header */}
            <div className="flex flex-col items-start gap-3 w-full">
              {/* title */}
              <div className="w-full flex flex-row justify-between items-center">
                <div className="overflow-hidden h-full flex items-center">
                  <span className="font-semibold text-fore truncate text-md md:text-lg">{title[0]}</span>
                </div>

                <button className="px-4 h-8 w-[30%] min-w-28 max-w-36 bg-fore flex flex-row items-center justify-center rounded-md hover">
                  {
                    <>
                      {title[1]}     
                      <span className="font-normal text-xs md:text-sm ml-1 text-back">Logout</span>
                    </>
                  }
                </button>
              </div>

              {/** subtitle */}
              <p className="font-normal text-sm md:text-md text-gray-500">{sub}</p>
            </div>

            {/** tabs */}
            <div className="w-full flex flex-row items-center justify-around bg-zinc-800 rounded-md h-8 md:h-10 gap-1 p-1">
              {
                tabs.map((tab, i) => (
                  <div className={`flex-1 flex items-center justify-center text-xs md:text-sm font-semibold text-fore rounded-sm h-full ${tabShown === tab.name ? "bg-back text-fore" : "bg-transparent text-gray-400"}`} key={i}
                  onClick={() => {
                    if(tabShown !== tab.name) setTabShown(tab.name)
                  }}>{tab.name}</div>
                ))
              }
            </div>

            {/** options */}
            <div className="flex flex-col w-full">
              <form action="" className="w-full flex-col flex gap-5">
                {
                  tabs.map( ({ items, name }, i) => (
                    <React.Fragment key={i}>
                      {items.map( ( item, i) => (
                        <div className={`flex flex-col items-start gap-2 w-full ${name===tabShown ? "block" : "hidden"}`} key={i}>
                          <label htmlFor={item.for}>{item.label}</label>
                          {item.content}
                        </div>
                      ))}
                    </React.Fragment>
                  ))
                }
              </form>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SideSettings