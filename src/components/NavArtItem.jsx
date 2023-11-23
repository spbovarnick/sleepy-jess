'use client'

import Link from "next/link"
import { useState } from "react";

export default function NavArtItem({ data, key }) {
  const { years, navTitle, slug, _id} = data
  const [showYears, setShowYears] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowYears(!showYears)
  }

  return(
    <>
      <li className="flex items-center">
        <Link href={`/${slug}`}>
          {navTitle}
        </Link>
        { years.every(x => x) > 0 && 
          <img className="inline-block" src={showYears ? "/caret-down-light.svg" : "/caret-right-light.svg"} onClick={e => handleClick(e)} />
        }
      </li>
      <ul className="years-list ml-1" style={{display: showYears ? 'block' : 'none'}}>
        {years.map(year => (
          year &&
          <li key={year + slug}>
            <Link href={`/${slug}?year=${year}`}>
              {year}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}