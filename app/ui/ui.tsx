import { AutoResizeTextarea } from "@/components/chatPage/AutoResizeTextarea";
import React from "react";
import { TbLogout } from "react-icons/tb";
import { BiHomeAlt } from "react-icons/bi";

type BtnProps = React.ComponentProps<'button'>;
type InputProps = React.ComponentProps<'input'>;

interface SideType {
  title: [string, string, React.ReactElement];
  sub?: string;
  isOpen: boolean;
  tabs: {
    name: string;
    items: {
      for: string;
      label: string;
      content: React.ReactElement;
    }[];
  }[];
}


export const Button = ({children, className, ...props}:  BtnProps) => {
  return (
    <button className={ `flex items-center justify-center hover ${className}`} {...props}>
      {children}
    </button>
  );
}

const Input = ({...props}: InputProps) => {
  return (
    <input className="w-full h-8 md:h-10 border border-gray-500 outline-fore" {...props}/>
  )
}

export const sideProfileProps = {
    // eslint-disable-next-line react/jsx-key
  title: ["Profile", "Logout", <TbLogout size={20} className="text-back"/>],
  sub: "Configure profile settings.",
  isOpen: false,
  tabs: [
    {
      name: "Profile",
      items: [
        {
          for: "username",
          label: "Username",
          content: <Input className="p-2 bg-back rounded-md outline-none border border-gray-500 w-full focus:border-2 focus:border-fore" name="username" placeholder="Set your usename"/>
        },
        {
          for: "image",
          label: "Profile image",
          content: <Button className="p-2 bg-fore rounded-md w-full text-back" name='image' type="button" children="Set profile image"/>
        },
        {
          for: "iam",
          label: "What would you like the AI to know about you to provide better answers?",
          content: <AutoResizeTextarea name="iam" placeholder="I am..." className="msg w-full bg-back p-2 border border-gray-500" minHeight="100px" maxHeight="200px"/>
        },
      ]
    },
    {
      name: "API Keys",
      items: [
        {
          for: "openAI",
          label: "OpenAI API Key", 
          content: <Input name='openAI' className="p-2 bg-back rounded-md outline-none border border-gray-500 w-full focus:border-2 focus:border-fore"  placeholder="Paste your key"/>
        }
      ]
    },
    {
      name: "Account",
      items: []
    },
  ]
} as SideType;

export const sideSettingsProps = {
    // eslint-disable-next-line react/jsx-key
  title: ["Settings", "Home", <BiHomeAlt size={20} className="text-back"/>],
  sub: "Configure your settings.",
  isOpen: false,
  tabs: [
    {
      name: "Main",
      items: [
        {
          for: "workname",
          label: "Workspace Image",
          content: <Input className="p-2 bg-back rounded-md outline-none border border-gray-500 w-full focus:border-2 focus:border-fore" name="workname" placeholder="Set your usename"/>
        },
        {
          for: "workimage",
          label: "Workspace image",
          content: <Button className="p-2 bg-fore rounded-md w-full text-back" name='workimage' type="button" children="Set workspace image"/>
        },
      ]
    },
    {
      name: "Defaults",
      items: []
    },
  ]
} as SideType;



export type { SideType };