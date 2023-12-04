'use client'

import Link from "next/link"
import { useState } from "react";

export default function NavArtItem({ data, handlePageSelect, pageParam, yearParam }) {
  const { years, navTitle, slug, homepage } = data;
  const [showYears, setShowYears] = useState(false);

  function handleClick() {
    setShowYears(!showYears)
  }

  return(
    <>
      <li className="flex items-center cursor-pointer hover:text-sky-500 my-2" >
        <span onClick={e => handlePageSelect(e)} className={pageParam === slug || homepage && pageParam === undefined ? "text-orange-500" : ""}>
          <Link href={`/${slug}`} >
            {navTitle}
          </Link>
        </span>
        { years && years.every(x => x) > 0 && 
          <img className="inline-block ml-1.5 hover:opacity-50" src={showYears ? "/caret-down-light.svg" : "/caret-right-light.svg"} onClick={e => handleClick()} />
        }
      </li>
      <ul className="years-list" style={{display: showYears ? 'block' : 'none'}}>
        {years?.map(year => (
          year &&
          <li key={year + slug} className="hover:text-sky-500">
            <span onClick={e => handlePageSelect(e)} className={pageParam === slug && yearParam == year ? "text-orange-500" : ""}>
              <Link 
                href={`/${slug}?year=${year}`}
                className="text-sm pl-2 leading-none"
              >
                {year}
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}