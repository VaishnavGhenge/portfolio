import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vaishnav Ghenge',
  description: 'Vaishnav Ghenge Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0'>
          <div className='lg:flex lg:justify-between lg:gap-4'>
            <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24'>
              <div className='mb-16'>
                <h1 className='text-4xl font-bold tracking-tight'>
                  <a href="/">
                    Vaishnav Ghenge
                  </a>
                </h1>
                <h2 className='mt-3 text-lg font-medium tracking-tight'>
                  <span className='mr-1'>Application Developer Intern at</span>
                  <a href="https://www.noovosoft.com/" target='_blank' referrerPolicy='no-referrer'>Noovosoft</a>
                </h2>
                <p className='mt-4 max-w-xs leading-normal'>I build accessible, inclusive products and digital experiences for the web.</p>
              </div>
            </header>
            <main className='className="pt-24 lg:w-1/2 lg:py-24'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
