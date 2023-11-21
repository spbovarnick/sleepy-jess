import { client } from "@/utils/sanity/lib/client"
import GalleryCard from "./GalleryCard"

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
  const {page_heading, gallery} = data ?? {};
  console.log(data)
  
  return (
    data &&
      <>
        <h1>{page_heading}</h1>
        <div className="gallery-wrapper grid grid-cols-1 justify-items-center">
          {gallery.length > 0 && gallery.map(artwork => (
            <GalleryCard key={artwork._key} artwork={artwork} />          
          ))}
        </div>
      </>
  )
}