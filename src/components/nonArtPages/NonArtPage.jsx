"use server";

import Carousel from "./Carousel";
import { PortableText } from "@portabletext/react"

const blurbComponents = {
  marks: {
    link: ({value, children}) => {
      return (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-sky-500 transition-all"
        >
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside">{children}</ul>,
    number: ({children}) => <ol className="list-inside list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li >{children}</li>
  }
}

export default async function NonArtPage({data}) {
  
  return(
    data &&
    <>
      <h1 className="text-2xl">{data?.page_heading}</h1>
      { data?.gallery && data?.page_type === 'about' &&
        <Carousel gallery={data?.gallery} ></Carousel>
      }
      <br/>
      <PortableText 
        value={data.blurb}
        components={blurbComponents}
      />

    </>
  )
}