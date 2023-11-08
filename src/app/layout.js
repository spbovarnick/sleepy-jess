import './globals.css'
import Image from 'next/image';

export const metadata = {
  title: 'Jess Ackerman',
  description: "Artist Jess Ackerman's portfolio",
}

export default function RootLayout({ children }) { 
  return (
    <html lang="en">
      <body>
        <nav className='fixed top-0 left-0 w-44 flex flex-col m-9'>
            <Image 
              src="/logo-placeholder.png"
              width={500}
              height={500}
              className='w-full h-full'
              alt='Sleepy Jess logo'
            />
            <div>
              <ul className='primary-destinations'>
                <li>
                  <a
                    href="/"
                  >
                    Painting
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                  >
                    Design/Illustration
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                  >
                    Mud and More
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                  >
                    Shop
                  </a>
                </li>
              </ul>
              <ul className='secondary-destinations'>
                <li>
                  <a>
                    About
                  </a>
                </li>
                <li>
                  <a>
                    Contact
                  </a>
                </li>
                <li>
                  <a>
                    Process
                  </a>
                </li>
                <li>
                  <a>
                    Friends
                  </a>
                </li>
              </ul>
            </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
