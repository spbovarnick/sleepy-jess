import { Providers } from './providers';
import './globals.css'
import Nav from '@/components/Nav/Nav';
import { Josefin_Sans } from 'next/font/google'

export const dynamic = 'force-static'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Jess Ackerman',
  description: "Artist Jess Ackerman's portfolio",
}

export default function RootLayout({ children }) { 

  return (
    <html lang="en" className={josefinSans.className}>
      <body>
        <Providers>
          <div className='flex flex-col md:flex-row'>
            <Nav />
            <div className='md:w-full p-9'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
