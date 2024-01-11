export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-05'

export const dataset = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SANITY_DEV_DATASET : process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const useCdn = process.env.NODE_ENV === "development" ? true : false;
export const token = process.env.SANITY_READ_WRITE_TOKEN;
export const readToken = process.env.SANITY_READ_ONLY_TOKEN;
