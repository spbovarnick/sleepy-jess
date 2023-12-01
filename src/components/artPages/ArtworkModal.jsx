'use client'
import getPageData from "@/utils/api/getPageData";
import Modal from "react-modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";


export default function ArtworkModal() {
  Modal.setAppElement("#appElement")
  const router = useRouter();
  const params = useParams();
  const artworkSlug = params.artwork
  const pageSlug = params.page
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const searchParams = useSearchParams();
  const year = searchParams.get('year');
  // const { title, url, alt } = data[0]
  
  useEffect(()=> {
    
    const query = `*[_type == "art_page" && slug.current == "${pageSlug}"].art_gallery[artwork_slug.current == "${artworkSlug}"]{
      title,
      alt,
      'url': image.asset -> url,
    }`;
    (async () => {
      const data = await getPageData(query)
      setTitle(data[0].title)
      setUrl(data[0].url)
      setAlt(data[0].alt)
    })().catch(e => console.log(e));
  }, [])
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // console.log(data)

  // const query = `*[_type == "art_page" && slug.current == "painting"][0]{
  //   "artwork": art_gallery[artwork_slug.current == ${artworkSlug}] {
  //     title,
  //     'url': image.asset -> url ,
  //   }
  // }`
  // const data = await getPageData(query)
  // console.log(data)
  function closeModalRoute() {
    router.push(`/${pageSlug}${year ? "?year=" + year : ''}`)
  }

  return (
    url && title && alt && 
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalRoute}
      style={customStyles}
      contentLabel="Artwork Modal"
    >
      <Image
        src={url}
        width={500}
        height={500}
        alt={alt}
      />
    </Modal> 
  )
}