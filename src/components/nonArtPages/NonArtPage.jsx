import getPageData from "@/utils/api/getPageData"

export default async function NonArtPage({slug}) {
  const query = `*[_type == "non_art_page" && slug.current == "${slug}"][0]{
    page_heading,
    page_type,
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
    <>
      <h1>{data.page_heading}</h1>
    </>
  )
}