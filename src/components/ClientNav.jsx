'use client'

import Link from "next/link"
import NavArtItem from "./NavArtItem"

export default function ClientNav({artPages, nonArtPages}) {

  return (
    <>
      <div className="primary-nav">
        <ul>
          {artPages.length > 0 && (
            artPages.map( (link) => (
              <NavArtItem key={link._id} data={link} homepage={link.hompeage} />
            ))
          )}
          <li className="hover:text-sky-500">
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
              <li key={link._id + link.slug} className="hover:text-sky-500">
                <Link href={`/${link.slug}`}>
                  {link.navTitle}
                </Link>
              </li>
            ))
          }
          <li className="hover:text-sky-500">
            <Link href={'/contact'}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}