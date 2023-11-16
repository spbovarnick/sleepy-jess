/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SANITY_DATASET : process.env.NEXT_DEV_SANITY_DATASET
const token = process.env.NEXT_PUBLIC_SANITY_READ_WRITE_TOKEN

export default defineCliConfig({ api: { projectId, dataset, token } })
