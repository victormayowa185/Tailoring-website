import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'vok5ubmf',  
  dataset: 'production',        
  useCdn: true,                  
apiVersion: '2024-01-01',  
})

const builder = createImageUrlBuilder(client)   
export const urlFor = (source) => builder.image(source)