import ArtworkModal from "@/components/artPages/ArtworkModal";
import getPageData from "@/utils/api/getPageData";
import { client } from "@/utils/sanity/lib/client";

// export async function generateStaticParams() {
//   try {
//     const query = `*[_type == 'art_page'].art_gallery.artwork_slug.current`
//     const artwork_slugs = await client.fetch(query)
//     // console.log(artwork_slugs)
//     return artwork_slugs.map(as => ({
//       params: { artwork: as.page }
//     }))
//   } catch (error) {
//     console.log('Error fetching data from sanity:', error)
//   }
// }

export default async function ArtModal() {
  // const { artwork, page } = params
  // console.log(params)
  // const query = `*[_type == "art_page" && slug.current == "painting"].art_gallery[artwork_slug.current == "${artwork}"]{
  //   title,
  //   alt,
  //   'url': image.asset -> url,
  // }`
  
  // const data = await getPageData(query)
  // console.log(data[0])

  return (
    <>
      <ArtworkModal  />
    </>
  )
}