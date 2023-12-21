'use client'
import {motion} from 'framer-motion';
import Image from "next/image"


export default function NAGalleryCard({item, index, page_type}){
  const { img_url, img_alt, caption, attribution, blurb, name, friend_url, friend_url_text } = item ?? item;

  const infoClassNames = index % 2 === 0 ? "text-left pl-2 order-last" : "text-right pr-2 order-first"
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <div className="w-full flex justify-around px-[10%]">
        <div className="w-1/2 h-fit">
          <Image 
            src={img_url}
            width={500}
            height={500}
            alt={img_alt}
            className='object-contain w-full'
          />
          { attribution && 
            <p className="text-gray-400 italic text-xs">Photo by {attribution}</p>
          }
          { caption && 
            <p className="text-sm">{caption}</p>
          }
        </div>
        <div className={`info flex flex-col ${ page_type === 'friends' ? "justify-end" : "justify-center" } w-2/5 ${infoClassNames}`}>
          { 
            <p className="text-lg font-semibold">{name}</p>
          }
          { blurb && 
            <p className={`${ page_type === 'process' && 'text-lg' }`}>{blurb}</p>
          }
          { friend_url && 
            <a 
              href={friend_url} 
              target="_blank" 
              rel="no-referrer"
              className="underline text-blue-700 hover:text-sky-500 transition-all"
            >
              {friend_url_text}
            </a>
          }
        </div>
      </div>
    </motion.div>
  )
}