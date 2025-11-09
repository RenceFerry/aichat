import { AutoResizeTextarea } from "@/components/chatPage/AutoResizeTextarea";
import React from "react";
import { TbLogout } from "react-icons/tb";

type BtnProps = React.ComponentProps<'button'>;
type InputProps = React.ComponentProps<'input'>;

interface SideType {
  title: [string, React.ReactElement];
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
  title: ["Profile", <TbLogout size={20} className="text-back"/>],
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
          content: <Button className="p-2 bg-fore rounded-md w-full text-back" name='username' type="button" children="Set profile image"/>
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

// export const sideSettingsProps = {
//   title: ["Settings", <p>kj</p>],
//   sub: "This is your Home Workspace for personal use.",
//   isOpen: false,
// } as SideType;

export type { SideType };