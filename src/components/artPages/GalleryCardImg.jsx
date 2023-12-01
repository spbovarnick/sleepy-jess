'use client'
// import { useEffect, useState } from "react";
import Image from "next/image";
// import Modal from "react-modal";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Modal.setAppElement('body')

export default function GalleryCardImg({ url, alt, title, artwork_slug, page_slug}) {
  const router = useRouter();
  // const params = useParams();
  const searchParams = useSearchParams();
  const year = searchParams.get('year')
  // const artwork = searchParams.get('artwork')
  // const page = params.page;
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(() => {
  //   if (artwork) {
  //     setModalIsOpen(true);
  //   }
  // }, [])

  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //   },
  // };

  function openModal() {
    // setModalIsOpen(true);
    router.push(`${page_slug}${year ? "?year="+year : ''}/${artwork_slug}`)
  }

  // function closeModal() {
  //   setModalIsOpen(false);
  //   router.push(`${page}${year ? "?year=" + year : ''}`)
  // }

  // console.log(page, artwork_slug)
  
  return (
    <>
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Artwork Modal"
      >
        <Image
          src={url}
          width={500}
          height={500}
          alt={alt}
        />
      </Modal> */}
      {/* <Link href={`${page_slug}/${artwork_slug}`}> */}
      <Image
        src={url}
        width={500}
        height={500}
        alt={alt}
        onClick={openModal}
        className='cursor-pointer'
      />
      {/* </Link> */}
    </>
  )
}