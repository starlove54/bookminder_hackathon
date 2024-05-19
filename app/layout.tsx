import type { Metadata } from 'next'
import './globals.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Poppins } from 'next/font/google'
import Header from './Components/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Bookminder',
  description: 'Your key to finishing every story',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} `}>
        <Header />
        <div className=" flex  w-full flex-col h-screen   py-4 ">
          <Navbar />
          <main className="flex-grow   overflow-y-scroll  m-6 py-2  ">
            {children}
          </main>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
