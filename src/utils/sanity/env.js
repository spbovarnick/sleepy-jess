export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-08'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const useCdn = false
export const token = process.env.SANITY_READ_WRITE_TOKEN
export const readToken = process.env.SANITY_READ_ONLY_TOKEN
