import { client } from "@/utils/sanity/lib/client"
import Image from "next/image"

async function getPageData(query) {
  try {
    const res = await client.fetch(query)
    return res
  } catch (error ) {
    console.log("Error fetching data from Sanity:", error)
  }
}

export default async function ArtPage({ slug, homepage }) {
  const query = `*[${homepage ? 'homepage == true' : `slug.current == "${slug}"`
    }][0]{
      page_heading,
      "gallery": art_gallery[]{
        _key,
        'url': image.asset -> url 
      }|order(date desc)
    }`;
  const data = await getPageData(query);
  const {page_heading, gallery} = data ? data : undefined;

  return (
    data &&
      <>
        <h1>{page_heading}</h1>
        {gallery.length > 0 && gallery.map(piece => (
          <div key={piece._key}>
            <Image 
              src={piece.url}
              width={500}
              height={500}
              alt="Art"
            />
          </div>
        ))}
      </>
  )
}