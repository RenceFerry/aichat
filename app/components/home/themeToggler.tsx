'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";

export const ThemeToggler = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(()=>setMounted(true), []);
  if (!mounted) return null

  return (
    <button className='hover absolute bottom-3 left-3' onClick={()=>setTheme(theme === 'dark'? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <FiMoon size={30} className='text-fore'/>
      ) : (
        <MdOutlineWbSunny size={30} className='text-fore'/>
      )}
    </button>
  );
}