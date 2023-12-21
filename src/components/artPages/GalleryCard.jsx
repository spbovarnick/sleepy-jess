'use client';
import {motion} from 'framer-motion';
import GalleryCardImg from "./GalleryCardImg";

export default function GalleryCard({artwork, page_slug, index}){
  const {date, title, alt, width, height, blurb, medium, url, slug} = artwork ?? artwork;

  const infoClassNames = index % 2 === 0 ? "text-right pr-2 order-first" : "text-left pl-2 order-last"

  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <div className="w-full flex px-[10%]">
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
    </motion.div>
  )
}