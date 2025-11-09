import Nav from "./components/home/nav";
import Link from 'next/link'
import { Button } from '@/ui/ui'
import { FaArrowRight } from "react-icons/fa";
import { auth } from '@/../auth';
import { redirect } from "next/navigation";
import { ThemeToggler } from "./components/home/themeToggler";

export default async function Page() {
  const session  = await  auth();

  if (session) redirect(`/chat/${session.user.id}`);


  return (
    <div className="p-0 m-0 h-full w-full flex flex-col items-center justify-start relative">
      <Nav />

      <div className="flex flex-col justify-between gap-6 m-auto pb-40 items-center w-2/3">
        <h1 className="font-extrabold tect-fore text-4xl">AI Chat</h1>
        <Button className='bg-blue-500 font-extrabold text-white flex items-center justify-center w-auto rounded-xl text-xl p-4 hover'>
          <Link href='/login' className=' flex gap-3 flex-row justify-around items-center'>
            <h1>Start Chatting</h1>
            <FaArrowRight size={25}/>
          </Link>
        </Button>
      </div>
      <ThemeToggler/>
    </div>
  );
}