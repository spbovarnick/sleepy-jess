
import './globals.css'
import { client } from '@/utils/sanity/lib/client';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Jess Ackerman',
  description: "Artist Jess Ackerman's portfolio",
}

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
