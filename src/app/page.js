'use client'
import ArtPage from "@/components/ArtPage"
import { useParams } from "next/navigation"

export default function Home() {
  const {page} = useParams();

  return (
    <>
      <ArtPage page={page} homepage={true} />
    </>
  )
}
