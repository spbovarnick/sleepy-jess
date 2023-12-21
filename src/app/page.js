import { sanityFetch } from "@/utils/api/sanityFetch"
import ArtPage from "@/components/artPages/ArtPage"

export default async function Home() {
  const query = `*[_type == 'art_page' && homepage == true][0]{
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

  let pageData;
  try {
    pageData = await sanityFetch({
    query: query,
    qParams: {},
    tags: ['art_page', 'non_art_page']
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return (
    <>
      <ArtPage data={pageData} />
    </>
  )
}
