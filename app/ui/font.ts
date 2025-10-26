import localfont from 'next/font/local';

export const Inter = localfont({
  src: [
    {
      path: '../../public/fonts/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Inter_18pt-SemiBold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Inter_24pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal'
    }
  ],
  variable: '--font-inter',
})