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
  }, [artwork, artwork_slug, isOpen, onOpen, onOpenChange])

  function openModal() {
    onOpen()
    router.push(`${page_slug ? page_slug : ""}?${year ? `year=${year}&` : ''}artwork=${artwork_slug}`)
  }


  function closeModal(){
    onOpenChange();
    router.push(`${page_slug ? page_slug : ""}?${year ? `year=${year}` : ''}`)
  }
  
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal} 
        hideCloseButton={true} 
        size={"5xl"} 
        placement={"center"}
        backdrop={"opaque"}
        classNames={{
          base: "rounded p-8 border-0",
          body: "flex items-center justify-center"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <Image
                  src={url}
                  width={500}
                  height={500}
                  alt={alt}
                  className='cursor-pointer max-w-[75vh] max-h-[75vh] h-[75vh] w-full w-[auto] object-contain'
                />
              </ModalBody>
              <ModalFooter className="flex justify-start p-4 pb-0">
                <span className="font-bold italic text-lg">{title}</span>
              </ModalFooter>
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
        className='cursor-pointer object-contain w-1/2 hover:opacity-75 ease-linear duration-200'
      />
    </>
  )
}