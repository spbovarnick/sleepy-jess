'use client'

import './nav.css'
import { useState } from "react"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import NavArtItem from "./NavArtItem"

export default function ClientNav({artPages, nonArtPages}) {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const yearParam = searchParams.get('year');
  const { page } = params
  const [showNav, setShowNav] = useState(false);

  function toggleMobileNav(){
    return setShowNav(!showNav)
  }

  return (
    <>
    <button onClick={toggleMobileNav} className="absolute bottom-6 right-0 mr-4 hover:text-sky-500 active:text-sky-500 ease-linear duration-200 md:hidden">{!showNav ? 'menu' : 'close'}</button>
    <div className={`${showNav ? 'max-h-96' : 'max-h-0'} client-nav overflow-hidden order-1 bg-orange-500 m-0 text-center text-white md:text-black md:h-fit md:order-3 md:bg-white md:text-left md:max-h-full w-fit`} id='client-nav'>
      <div className="primary-nav">
        <ul>
          {artPages.length > 0 && (
            artPages.map( (link) => (
              <NavArtItem key={link._id} data={link} pageParam={page} yearParam={yearParam} toggleMobileNav={toggleMobileNav} />
            ))
          )}
          <li className={`opacity-60 my-1 hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200`}>
            <a href={'https://sleepyjess.bigcartel.com/'} target='_blank' rel='noopener noreferrer'>
              Shop
            </a>
          </li>
        </ul>
      </div>
      <hr className='my-5 border hidden md:block' />
      <div className="secondary-nav">
        <ul>
          {nonArtPages.length > 0 &&
            nonArtPages.map( (link) => (
              <li 
                key={link._id + link.slug} 
                className={`hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200 text-slate-700 text-md ${page === link.slug ? "opacity-100 md:text-orange-500" : "opacity-60"}`}
              >
                <Link href={`/${link.slug}`} onClick={toggleMobileNav} >
                  {link.navTitle}
                </Link>
              </li>
            ))
          }
            <li className={`hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200 text-slate-700 text-md ${pathname === "/contact" ? "opacity-100 md:text-orange-500" : "opacity-60"}`}>
            <Link href={'/contact'}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}