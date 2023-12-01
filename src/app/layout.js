import './globals.css'
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Jess Ackerman',
  description: "Artist Jess Ackerman's portfolio",
}

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body className='flex' id='appElement'>
        <Nav />
        <div className='w-full p-9'>
          {children}
        </div>
      </body>
    </html>
  )
}
