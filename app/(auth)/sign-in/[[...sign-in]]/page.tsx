import React from 'react'
import { SignIn } from '@clerk/nextjs'
const SignInPage = () => {
  return (
    <main className="flex justify-center mt-10">
      <SignIn />
    </main>
  )
}

export default SignInPage
