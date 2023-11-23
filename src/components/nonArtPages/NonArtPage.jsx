import getPageData from "@/utils/api/getPageData"

export default async function NonArtPage({slug, page_type}) {
  const query = `*[_type == "${page_type}" && slug.current == "${slug}"][0]{
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
  data && console.log(data)

  return(
    <>
      <h1></h1>
    </>
  )
}