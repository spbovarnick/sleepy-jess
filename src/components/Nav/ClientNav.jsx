'use client'

import { useState } from "react"
import Link from "next/link"
import NavArtItem from "./NavArtItem"

export default function ClientNav({artPages, nonArtPages}) {
  const [selectedPage, setSelectedPage] = useState(null)

  // sets state that is used to assign text color indicating selected page
  function handlePageSelect(e) {
    e.preventDefault();
    setSelectedPage(e.target.innerText)
  }

  return (
    <>
      <div className="primary-nav">
        <ul>
          {artPages.length > 0 && (
            artPages.map( (link) => (
              <NavArtItem key={link._id} data={link} handlePageSelect={handlePageSelect} selectedPage={selectedPage} />
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
                <span onClick={e => handlePageSelect(e)} className={selectedPage === link.navTitle ? "text-orange-500" : ""}>
                  <Link href={`/${link.slug}`}>
                    {link.navTitle}
                  </Link>
                </span>
              </li>
            ))
          }
          <li className="hover:text-sky-500">
            <span onClick={e => handlePageSelect(e)} className={selectedPage === "Contact" ? "text-orange-500" : ""}>
              <Link href={'/contact'}>
                Contact
              </Link>
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}