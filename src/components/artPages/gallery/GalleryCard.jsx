'use client';
import {motion} from 'framer-motion';
import GalleryCardImg from "./GalleryCardImg";
// import './gallery.css';

export default function GalleryCard({artwork, page_slug, index, first}){
  const {date, title, alt, width, height, blurb, medium, url, slug} = artwork ?? artwork;

  const infoClassNames = index % 2 === 0 ? "md:text-right md:pr-2 md:order-first" : "md:text-left md:pl-2 md:order-last"

  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <div className="gallery-card w-full flex flex-col md:flex-row">
        <GalleryCardImg url={url} alt={alt} title={title} artwork_slug={slug} page_slug={page_slug} first={first} />
        <div className={`info flex flex-col justify-end w-max shrink-0 ${infoClassNames}`}>
          <p className="text-md md:text-lg"><span className="font-bold italic">{title},</span> <span>{date.substring(0, date.indexOf('-'))}</span></p>
          { medium && height &&
            <p className='text-sm'>{width} x {height} inches</p>
          }
          { medium 
            && <p className='text-sm'>{medium}</p>
          }
          { blurb && 
            <p className='text-sm'>{blurb}</p>
          }
        </div>
      </div>
    </motion.div>
  )
}