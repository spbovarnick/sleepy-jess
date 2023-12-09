import { PortableText } from "@portabletext/react"
import getPageData from "@/utils/api/getPageData"

const components = {
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

export default async function NonArtPage({slug}) {
  const query = `*[_type == "non_art_page" && slug.current == "${slug}"][0]{
    _id,
    page_heading,
    page_type,
    blurb,
    defined(friends_gallery) => {
      "gallery": friends_gallery[] | order(orderRank) {
        first_name,
        last_name,
        blurb,
        friend_url,
        'img_url': photo.asset -> url,
        'img_alt': photo.alt
      },
    },
    defined(process_gallery) => {
      "gallery": process_gallery[] | order(orderRank) {
        'img_url': photo.asset -> url,
        'img_alt': photo.alt,
        'caption': photo.caption,
        'attribution': photo.attribution,
        blurb
      },
    },
  }`
  
  const data = await getPageData(query)

  return(
    data &&
    <>
      <h1 className="text-2xl">{data?.page_heading}</h1>
      <br/>
      <PortableText 
        value={data.blurb}
        components={components}
      />

    </>
  )
}