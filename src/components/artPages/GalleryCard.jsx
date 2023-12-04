// import Image from "next/image"
import GalleryCardImg from "./GalleryCardImg";

export default function GalleryCard({artwork, page_slug, index}){
  const {date, title, alt, width, height, blurb, medium, url, slug} = artwork ?? artwork;

  const infoClassNames = index % 2 === 0 ? "text-left pl-2 order-last" : "text-right pr-2 order-first"

  
  return (
    <div className="w-full flex ">
      <GalleryCardImg url={url} alt={alt} title={title} artwork_slug={slug} page_slug={page_slug} />
      <div className={`info flex flex-col justify-end w-2/5 ${infoClassNames}`}>
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