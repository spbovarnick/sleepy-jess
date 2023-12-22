'use client'
import {sanityFetch} from "@/utils/api/sanityFetch";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import GalleryCard from "./GalleryCard"

export default function ArtPage({ page }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  
  useEffect(() => {
    (async () => {
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
      try {
        const pageData = await sanityFetch({
          query: artQuery,
          qParams: { slug: page, year: `${searchParams.year}` },
          tags: ['art_page', 'non_art_page']
        });
        setData(pageData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error here, e.g. show an error message to the user
        return null;
      }
    })().catch((error) => {
      console.error(error)
    })
  }, [data, setData, searchParams])

  
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