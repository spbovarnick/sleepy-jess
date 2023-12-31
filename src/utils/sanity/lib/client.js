import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token, useCdn, readToken } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
  perspective: 'published',
  // readToken
})

export const xclient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  readToken
})

