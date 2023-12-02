'use client'

import Link from "next/link"
import { useState } from "react";

export default function NavArtItem({ data }) {
  const { years, navTitle, slug } = data
  const [showYears, setShowYears] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setShowYears(!showYears)
  }

  return(
    <>
      <li className="flex items-center cursor-pointer hover:text-sky-500 my-2">
        <Link href={`/${slug}`}>
          {navTitle}
        </Link>
        { years && years.every(x => x) > 0 && 
          <img className="inline-block ml-1.5 hover:opacity-50" src={showYears ? "/caret-down-light.svg" : "/caret-right-light.svg"} onClick={e => handleClick(e)} />
        }
      </li>
      <ul className="years-list" style={{display: showYears ? 'block' : 'none'}}>
        {years?.map(year => (
          year &&
          <li key={year + slug} className="hover:text-sky-500">
            <Link 
              href={`/${slug}?year=${year}`}
              className="text-sm pl-2 leading-none"
            >
              {year}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}