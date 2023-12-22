import "server-only"
import { client } from "../sanity/lib/client";

export async function sanityFetch({ 
  query, 
  qParams, 
  tags 
}) {
  return client.fetch(query, qParams, {
    cache: "no-cache",
    next: { tags },
  });
}