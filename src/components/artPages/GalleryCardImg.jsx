'use client'
import { useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

export default function GalleryCardImg({ url, alt, title, artwork_slug, page_slug}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get('year')
  const artwork = searchParams.get('artwork')

  useEffect(() => {
    if (artwork && artwork === artwork_slug) {
      onOpen();
    } else {
      if (isOpen) {
        onOpenChange()
      }
    }
  }, [])

  function openModal() {
    onOpen()
    router.push(`${page_slug}?${year ? `year=${year}&` : ''}artwork=${artwork_slug}`)
  }


  function closeModal(){
    onOpenChange();
    router.push(`${page_slug}?${year ? `year=${year}` : ''}`)
  }
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} hideCloseButton={true} >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <Image
                  src={url}
                  width={500}
                  height={500}
                  alt={alt}
                  className='cursor-pointer'
                />
              </ModalBody>
              <ModalFooter className="">{title}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Image
        src={url}
        width={500}
        height={500}
        alt={alt}
        onClick={openModal}
        className='cursor-pointer'
      />
    </>
  )
}