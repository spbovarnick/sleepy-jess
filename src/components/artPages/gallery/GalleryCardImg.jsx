'use client'
import { useRouter, useSearchParams } from "next/navigation";
import React, {useEffect} from "react";
import { Modal, ModalContent, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import './gallery.css'
import ClientImg from "@/components/ClientImg";

export default function GalleryCardImg({ img, alt, title, artwork_slug, page_slug, first}) {
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
        size={"5xl"} 
        placement={"center"}
        backdrop={"opaque"}
        classNames={{
          base: "rounded border-0",
          closeButton: "top-0 right-0"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <ClientImg 
                  img={img}
                  sizes={"(max-wdith: 1440px) 100vw, 50vw"}
                  classes={'cursor-pointer max-w-full max-h-full h-full w-full py-4 md:max-w-[80vh] md:max-w-[80vw] md:h-[80vh] md:w-auto object-contain'}
                />
              </ModalBody>
              <ModalFooter className="flex justify-start pl-6 pt-0 pb-0 md:pb-4">
                <span className="font-bold italic text-lg">{title}</span>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="" onClick={openModal}>
        <ClientImg 
          img={img}
          sizes={"(max-wdith: 1440px) 100vw, 50vw"}
          classes={`${first && 'first-gallery-card-image'} cursor-pointer object-contain w-full md:h-[calc(100vh-40px)] hover:opacity-75 ease-linear duration-200`}
        />
      </div>
    </>
  )
}