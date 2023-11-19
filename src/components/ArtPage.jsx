'use client'

import { useParams } from "next/navigation"
import { useEffect } from "react";

const ArtPage = () => {
  const slug = useParams();

  // useEffect(()=> {
  //     const artPageQuery = `*[_type == 'art_page' && slug == ${slug}]{
  //         page_heading,
  //         homepage,
  //         slug,

  //     }`
  // },[])

  return (
      <>
      <h1>hi</h1>
      </>
  )
}

export default ArtPage