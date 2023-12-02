import { Providers } from './providers';
import './globals.css'
import Nav from '@/components/Nav';
import { Josefin_Sans } from 'next/font/google'

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
      <body id='appElement' className=''>
        <Providers>
          <div className='flex'>
            <Nav />
            <div className='w-full p-9'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
