// middleware.ts
import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // If the user is not logged in and trying to access /chat, redirect to login
  if (!req.auth && req.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If the user is logged in and trying to access /login or /signup, redirect to chat
  if (req.auth && ((req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) || Number(req.nextUrl.pathname.split('/').filter(Boolean)[1]) !== Number(req.auth?.user.id))) {
    return NextResponse.redirect(new URL(`/chat/${req.auth?.user.id}`, req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
