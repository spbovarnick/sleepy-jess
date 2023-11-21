// 'use client'
import { client } from "@/utils/sanity/lib/client"
import ArtPage from "@/components/artPages/ArtPage"
import NonArtPage from "@/components/nonArtPages/NonArtPage"
// import { useParams } from "next/navigation"
export async function generateStaticParams() {
  try {
    const query = `*[_type in ['art_page', 'non_art_page']]{
      'page': slug.current
    }`
    const pages = await client.fetch(query)
    return pages.map(page => ({
      params: {page: page.page}
    }))
  } catch (error) {
    console.log('Error fetching data from sanity:', error)
  }
}

async function fetchPageType(query){
  try {
    const type = await client.fetch(query)
    return type
  } catch (error) {
    console.log('Error fetching data from sanity:', error)
  }
}

export default async function Page({ params }) {
  const { page } = params 
  const query = `*[_type in ['art_page', 'non_art_page'] && slug.current == "${page}"][0]{
      'type': _type,
      page_type
    }`
  const data = await fetchPageType(query)
  const type = data?.type
  const page_type = data?.page_type
  
  return (
      <>
      {
        type === 'art_page' ? <ArtPage slug={page} homepage={false} /> :
        <NonArtPage slug={page} page_type={page_type} />
      }
      </>
  )
}