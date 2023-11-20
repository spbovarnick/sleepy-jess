'use client'

import ArtPage from "@/components/ArtPage"
import { useParams } from "next/navigation"

export default function Page() {
  const {page} = useParams();
  console.log(page)
  return (
      <>
          <ArtPage slug={page} homepage={false} />
      </>
  )
}