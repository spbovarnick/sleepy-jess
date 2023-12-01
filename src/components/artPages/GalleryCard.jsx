// import Image from "next/image"
import GalleryCardImg from "./GalleryCardImg";

export default function GalleryCard({artwork, page_slug}){
  const {date, title, alt, width, height, blurb, medium, url, slug} = artwork ?? artwork;
  
  return (
    <div >
      <GalleryCardImg url={url} alt={alt} title={title} artwork_slug={slug} page_slug={page_slug} />
      <div className="info mt-1">
        <p className="text-lg"><span className="font-bold italic">{title},</span> <span>{date.substring(0, date.indexOf('-'))}</span></p>
        { medium && height &&
          <p>{width} x {height} inches</p>
        }
        { medium 
          && <p>{medium}</p>
        }
        { blurb && 
          <p>{blurb}</p>
        }
      </div>
    </div>
  )
}