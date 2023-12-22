'use client'
import GalleryCard from "./GalleryCard"

export default async function ArtPage({ data }) {
  
  const { gallery, slug} = data ?? {};
  
  return (
    data &&
      <>
        <div className="grid gap-y-10 grid-cols-1 justify-items-center">
          {gallery.length > 0 && gallery.map((artwork, i) => (
            <GalleryCard key={artwork.key} artwork={artwork} page_slug={slug} index={i} />
          ))}
        </div>
      </>
  )
}