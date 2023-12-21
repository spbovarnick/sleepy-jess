import { Providers } from './providers';
import './globals.css'
import Nav from '@/components/Nav/Nav';
import { Josefin_Sans } from 'next/font/google'
import { sanityFetch } from '@/utils/api/sanityFetch';

async function faviData() {
  const faviQuery = `*[_type == 'favicon'][0]{
    'favicon_url': favicon.asset -> url ,
  }`
  const data = await sanityFetch({ query: faviQuery, qParams: {}, tags: ['favicon']  })
  return data
}

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Jess Ackerman',
  description: "Artist Jess Ackerman's portfolio",
}

export default async function RootLayout({ children }) { 
  const data = await faviData();
  console.log(data.favicon_url);

  return (
    <html lang="en" className={josefinSans.className}>
      <link rel="icon" href={data.favicon_url} type='image/png'/>
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
