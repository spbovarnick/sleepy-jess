import GalleryCard from "./GalleryCard"
import getPageData from "@/utils/api/getPageData";

export default async function ArtPage({ slug, homepage, year }) {
  const query = year ? `*[${homepage ? 'homepage == true' : `slug.current == "${slug}"`
    }][0]{
      page_heading,
      "gallery": art_gallery[date match "${year}"] | order(date desc) {
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
    }` : `*[${homepage ? 'homepage == true' : `slug.current == "${slug}"`
  }][0]{
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
  const data = await getPageData(query);
  const {page_heading, gallery} = data ?? {};
  
  return (
    data &&
      <>
        <div className="gallery-wrapper grid gap-y-10 grid-cols-1 justify-items-center">
          {gallery.length > 0 && gallery.map((artwork, i) => (
            <GalleryCard key={artwork.key} artwork={artwork} page_slug={slug} index={i} />
          ))}
        </div>
      </>
  )
}