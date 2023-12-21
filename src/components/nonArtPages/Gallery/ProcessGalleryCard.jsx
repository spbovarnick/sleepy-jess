import Image from "next/image"


export default function ProcessGalleryCard({item, index}){
  const {img_url, img_alt, caption, attribution, blurb} = item ?? item;

  const infoClassNames = index % 2 === 0 ? "text-left pl-2 order-last" : "text-right pr-2 order-first"

  
  return (
    <div className="w-full flex px-[10%]">
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
      <div className={`info flex flex-col justify-end w-2/5 ${infoClassNames}`}>
        { blurb && 
          <p>{blurb}</p>
        }
      </div>
    </div>
  )
}