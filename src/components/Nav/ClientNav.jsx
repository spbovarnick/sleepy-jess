'use client'

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

  return (
    <div className="client-nav overflow-hidden order-1 bg-orange-500 m-0 text-center text-white md:text-black md:h-fit md:order-2 md:bg-white md:text-left">
      <div className="primary-nav">
        <ul>
          {artPages.length > 0 && (
            artPages.map( (link) => (
              <NavArtItem key={link._id} data={link} pageParam={page} yearParam={yearParam} />
            ))
          )}
          <li className={`opacity-60 hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200`}>
            <Link href={'https://sleepyjess.bigcartel.com/'} >
              Shop
            </Link>
          </li>
        </ul>
      </div>
      <div className="secondary-nav">
        <ul>
          {nonArtPages.length > 0 &&
            nonArtPages.map( (link) => (
              <li 
                key={link._id + link.slug} 
                className={`hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200 ${page === link.slug ? "opacity-100 md:text-orange-500" : "opacity-60"}`}
              >
                <Link href={`/${link.slug}`}>
                  {link.navTitle}
                </Link>
              </li>
            ))
          }
          <li className={`hover:opacity-100 md:hover:text-sky-500 md:opacity-100 ease-linear duration-200 ${pathname === "/contact" ? "opacity-100 md:text-orange-500" : "opacity-60"}`}>
            <Link href={'/contact'}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}