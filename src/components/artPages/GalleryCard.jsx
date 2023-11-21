import Image from "next/image"

export default function GalleryCard({artwork}){
  
  
  return (
    <div >
      <Image
        src={artwork.url}
        width={500}
        height={500}
        alt="Art"
      />
    </div>
  )
}