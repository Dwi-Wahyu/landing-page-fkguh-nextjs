import type { CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Berita } from '@/payload-types'

// export const revalidateBerita: CollectionAfterChangeHook<Berita> = ({
//   doc,
//   previousDoc,
//   req: { payload, context },
// }) => {
//   if (!context.disableRevalidate) {
//     if (doc._status === 'published') {
//       const path = `/berita/${doc.slug}`

//       payload.logger.info(`Revalidating post at path: ${path}`)

//       revalidatePath(path)
//       revalidateTag('berita-sitemap')
//     }

//     // If the post was previously published, we need to revalidate the old path
//     if (previousDoc._status === 'published' && doc._status !== 'published') {
//       const oldPath = `/berita/${previousDoc.slug}`

//       payload.logger.info(`Revalidating old post at path: ${oldPath}`)

//       revalidatePath(oldPath)
//       revalidateTag('berita-sitemap')
//     }
//   }
//   return doc
// }

export const revalidateDelete: CollectionAfterDeleteHook<Berita> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/berita/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('berita-sitemap')
  }

  return doc
}
