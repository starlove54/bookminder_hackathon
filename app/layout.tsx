import type { Metadata } from 'next'
import './globals.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Poppins } from 'next/font/google'
import Header from './Components/Header'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Bookminder: your note taking app for stories',
  description: 'Your key to finishing every story',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} `}>
          <Header />
          <div className=" flex  w-full flex-col h-screen   ">
            <Navbar />
            <main className="flex-grow overflow-y-auto   ">{children}</main>
          </div>
          {/* <Footer /> */}
        </body>
      </html>
    </ClerkProvider>
  )
}
