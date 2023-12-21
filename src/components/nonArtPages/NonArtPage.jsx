"use server";

import Carousel from "./Carousel/Carousel";
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
      <h1 className="text-2xl md:mb-5">{data?.page_heading}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-fit order-last md:order-first">
          <PortableText 
            value={data.blurb}
            components={blurbComponents}
          />
        </div>
        { data?.gallery && data?.page_type === 'about' &&
          <div className="">
            <Carousel gallery={data?.gallery} ></Carousel>
          </div>
        }
        {/* <br/> */}
      </div>
    </>
  )
}