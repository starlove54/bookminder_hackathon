import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Poppins } from 'next/font/google'
import Header from './components/Header'

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
      <body className={poppins.variable}>
        <Header />
        <div className="flex h-screen w-full flex-col">
          <Navbar />
          <main className=" relative overflow-hidden">{children}</main>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
