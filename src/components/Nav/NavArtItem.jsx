'use client'

import './nav.css'
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
      <li className={`md:flex items-center cursor-pointer hover:opacity-100 md:hover:text-sky-500 my-1 md:opacity-100 ease-linear duration-200 ${pageParam === slug || homepage && pageParam === undefined ? "opacity-100 md:text-orange-500" : "opacity-60"}`} >
        <Link href={`/${slug}`} >
          {navTitle}
        </Link>
        { years && years.every(x => x) > 0 && 
          <img 
            className={`hidden md:block inline-block ml-1.5 hover:opacity-50 ease-linear duration-200 ${showYears ? "rotate-90" : ""}`} 
            src={"/caret-right-light.svg"} 
            onClick={e => handleClick()} 
          />
        }
      </li>
      <ul className={`hidden md:block years-list overflow-hidden  ${showYears ? 'max-h-96' : 'max-h-0'}`} id="year-menu">
        {years?.map(year => (
          year &&
          <li key={year + slug} className={`hover:text-sky-500 ease-linear duration-200 ${pageParam === slug && yearParam == year ? "text-orange-500" : ""}`}>
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