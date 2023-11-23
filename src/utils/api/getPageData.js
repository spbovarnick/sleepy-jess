import { client } from "../sanity/lib/client"

export default async function getPageData(query) {
  try {
    const res = await client.fetch(query)
    return res
  } catch (error) {
    console.log("Error fetching data from Sanity:", error)
  }
}