import { Berita, MediaBerita } from '@/payload-types'
import { BeritaClientComponent } from './berita-client'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type TBerita = {
  id: number
  title: string
  short_description?: string | null
  image: number | MediaBerita
  publishedAt: string
  slug?: string | null
}

export default async function BeritaSection() {
  const payload = await getPayload({ config: configPromise })

  const daftarBerita = await payload.find({
    collection: 'berita',
    limit: 4,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  // Pastikan data yang dikirim ke client sesuai dengan tipe Berita[]
  const beritaForClient: TBerita[] = daftarBerita.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    short_description: doc.short_description || null,
    publishedAt: doc.publishedAt,
    content: doc.content || null,
    image: doc.image as Berita['image'],
  }))

  return (
    <div id="section_berita" className="pt-10 md:px-10 pb-20">
      <BeritaClientComponent beritaData={beritaForClient} />
    </div>
  )
}
