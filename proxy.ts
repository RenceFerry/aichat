import { auth } from "./auth"
import { NextResponse, NextRequest } from "next/server"


export default async function proxy(req: NextRequest){
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|login|signup|$).*)',
  ],
}
