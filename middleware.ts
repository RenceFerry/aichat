// middleware.ts
import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const pathname = req.nextUrl.pathname
  const parts = pathname.split('/').filter(Boolean)
  const routeUserId = parts[1] ? Number(parts[1]) : undefined
  const userId = req.auth?.user?.id ? Number(req.auth.user.id) : undefined

  // If the user is not logged in and trying to access /chat, redirect to login
  if (!req.auth && pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If the user is logged in and trying to access /login or /signup, redirect to their chat
  if (req.auth && (pathname.startsWith('/login') || pathname.startsWith('/signup'))) {
    if (userId) return NextResponse.redirect(new URL(`/chat/${userId}`, req.url))
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If a logged-in user is trying to access someone else's chat, redirect to their own chat
  if (req.auth && userId && routeUserId && pathname.startsWith('/chat') && routeUserId !== userId) {
    return NextResponse.redirect(new URL(`/chat/${userId}`, req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
