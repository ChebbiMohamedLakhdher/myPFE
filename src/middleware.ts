import { NextURL } from 'next/dist/server/web/next-url'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' 
  const isPrivatePath =   path === '/reset' 
  // Get current URL
  const currentUrl = request.nextUrl.href;

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  if (currentUrl=== 'http://localhost:3000/reset'){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  if (currentUrl=== 'http://localhost:3000/verifyemail'){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  
  
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/reset',
    '/admin',
    '/employees',
    '/more',
  ]
}





