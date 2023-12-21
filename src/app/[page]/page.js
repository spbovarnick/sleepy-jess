import { client } from "@/utils/sanity/lib/client"
import { sanityFetch } from "@/utils/api/sanityFetch";
import ArtPage from "@/components/artPages/ArtPage"
import NonArtPage from "@/components/nonArtPages/NonArtPage"

export async function generateStaticParams() {
  try {
    const query = `*[_type in ['art_page', 'non_art_page']]{
      'page': slug.current,
      'type': _type,
    }`
    const pages = await client.fetch(query)
    return pages.map(p => ({
      params: {page: p.page}
    }))
  } catch (error) {
    console.log('Error fetching data from sanity:', error)
  }
}

async function fetchPageType(query){
  try {
    const type = await client.fetch(query)
    return type
  } catch (error) {
    console.log('Error fetching data from sanity:', error)
  }
}

export default async function Page({ params, searchParams }) {
  const { page } = params 
  const query = `*[_type  in ['art_page', 'non_art_page'] && slug.current == "${page}"][0]{
      'type': _type,
    }`
  const typeData = await fetchPageType(query)
  const type = typeData?.type
  const artQuery =
    searchParams.year ? `*[_type == 'art_page' && slug.current == $slug][0]{
      page_heading,
      "gallery": art_gallery[date match $year] | order(date desc) {
        "key": _key,
        date,
        title,
        alt,
        width,
        height,
        blurb,
        medium,
        'url': image.asset -> url ,
        "slug": artwork_slug.current
      }
    }` :
    `*[_type == 'art_page' && slug.current == $slug][0]{
      page_heading,
      "gallery": art_gallery[] | order(date desc) {
        "key": _key,
        date,
        title,
        alt,
        width,
        height,
        blurb,
        medium,
        'url': image.asset -> url ,
        "slug": artwork_slug.current
      }
    }`

  const nonArtQuery = `*[_type == "non_art_page" && slug.current == $slug][0]{
    _id,
    page_heading,
    page_type,
    blurb,
    defined(friends_gallery) => {
      "gallery": friends_gallery[] | order(orderRank) {
        "key": _key,
        name,
        blurb,
        friend_url,
        friend_url_text,
        'img_url': photo.asset -> url,
        'img_alt': photo.alt
      },
    },
    defined(process_gallery) => {
      "gallery": process_gallery[] | order(orderRank) {
        "key": _key,
        'img_url': photo.asset -> url,
        'img_alt': photo.alt,
        'caption': photo.caption,
        'attribution': photo.attribution,
        blurb
      },
    },
  }`
  let pageData;
  try {
    pageData = await sanityFetch({
      query: type === 'art_page' ? artQuery : nonArtQuery,
      qParams: { slug: page, year: `${searchParams.year}` },
      tags: ['art_page', 'non_art_page']
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error here, e.g. show an error message to the user
    return null;
  }
    
 
  return (
      <>
      { type === 'art_page' ?
        <ArtPage data={pageData} /> :
        <NonArtPage data={pageData} />}
      </>
  )
}