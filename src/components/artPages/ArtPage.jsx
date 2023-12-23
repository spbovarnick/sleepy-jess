// 'use client'
import GalleryCard from "./gallery/GalleryCard"
// import './gallery/gallery.css'

export default function ArtPage({ data }) {
  
  const { gallery, slug} = data ?? {};
  
  return (
    data &&
      <>
        <h1 className="text-2xl mb-2 md:mb-8">{data?.page_heading}</h1>
        <div className="art-page grid gap-y-10 grid-cols-1 justify-items-center">
          {gallery.length > 0 && gallery.map((artwork, i) => (
            <GalleryCard key={artwork.key} artwork={artwork} page_slug={slug} index={i} first={i === 0} />
          ))}
        </div>
      </>
  )
}