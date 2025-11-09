'use client'

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";

export const ThemeToggler = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>setMounted(true), []);
  if (!mounted) return null

  return (
    <button className='hover absolute bottom-3 left-3 z-30' onClick={async()=> await setTheme(theme === 'dark'? 'light' : 'dark')}>
      {theme === 'dark' ? (
        <FiMoon size={30} className='text-fore'/>
      ) : (
        <MdOutlineWbSunny size={30} className='text-fore'/>
      )}
    </button>
  );
}