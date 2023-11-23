import Image from "next/image"

export default function GalleryCard({artwork}){
  const {key, date, title, alt, width, height, blurb, medium, url} = artwork ?? artwork;
  
  return (
    <div >
      <Image
        src={url}
        width={500}
        height={500}
        alt="Art"
      />
    </div>
  )
}