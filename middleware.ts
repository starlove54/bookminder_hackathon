import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { create } from 'domain'

//here we can define some public routes , we can make some routes private also
// we want to automatically redirect users to the sign in page, so that route would be private

const protectedRoutes = createRouteMatcher(['/'])
export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
