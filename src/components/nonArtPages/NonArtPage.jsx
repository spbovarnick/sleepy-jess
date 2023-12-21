"use server";

import Carousel from "./Carousel/Carousel";
import NAGalleryCard from "./Gallery/NAGalleryCard";
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
  console.log(data)
  
  return(
    data &&
    <>
      <h1 className="text-2xl mb-2 md:mb-8">{data?.page_heading}</h1>
      <div className={data.page_type === 'about' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
        <div className={`h-fit ${data.page_type === 'about' ? "order-last md:order-first" : "mb-2"}`}>
          <PortableText 
            value={data.blurb}
            components={blurbComponents}
          />
        </div>
        { data.gallery && data.page_type !== 'about' && 
          <div className="grid gap-y-10 grid-cols-1 justify-items-center">
            {data.gallery.map((item, i) => (
              <NAGalleryCard key={item.key} item={item} index={i} page_type={data.page_type} />
            ))}
          </div>
        }
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