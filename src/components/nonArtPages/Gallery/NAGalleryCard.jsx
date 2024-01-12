// 'use client'
import ClientImg from '@/components/ClientImg';
// import {motion} from 'framer-motion';

export default function NAGalleryCard({item, index, page_type}){
  const { photo, caption, attribution, blurb, name, friend_url, friend_url_text } = item ?? item;

  const infoClassNames = "lg:text-left lg:pl-2 lg:order-last"

  console.log(photo)
  
  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} >
      <div className="w-full flex flex-col lg:flex-row">
        <div className="w-full h-auto">
          <ClientImg 
            img={photo}
            sizes={"(max-width: 1024px) 100vw, (min-width: 1024px) 50vw"}
            classes={"object-contain h-auto w-full"}
          />
          { attribution && 
            <p className="text-gray-400 italic text-xs">Photo by {attribution}</p>
          }
          { caption && 
            <p className="text-sm">{caption}</p>
          }
        </div>
        <div className={`info flex flex-col ${ page_type === 'friends' ? "justify-end" : "justify-end" } w-full ${infoClassNames}`}>
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
    // </motion.div>
  )
}