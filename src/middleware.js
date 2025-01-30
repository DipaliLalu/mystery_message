import { NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const token = await getToken({ req: request })
    const url = request.nexturl;
    if (token && (url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/verify'))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/signin', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/signin', '/signup', '/verify', '/dashboard','/'],
}