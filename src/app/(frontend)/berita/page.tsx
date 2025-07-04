import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import { Media } from '@/components/Media'
import { BeritaPagination } from '@/app/_components/berita-pagination'

export const dynamic = 'force-static'
export const revalidate = 600 // Revalidate every 10 minutes (600 seconds)

// Helper function to safely get the first paragraph from Lexical content
// This is a simplified example; for robust Rich Text rendering, consider a dedicated component
const getFirstParagraph = (content: any): string => {
  if (!content || !content.root || !content.root.children) return ''
  for (const node of content.root.children) {
    if (node.type === 'paragraph' && node.children && node.children.length > 0) {
      const textNode = node.children.find((child: any) => child.type === 'text')
      if (textNode) {
        // Limit to, say, 150 characters for a snippet
        const excerpt = textNode.text.substring(0, 150)
        return textNode.text.length > 150 ? excerpt + '...' : excerpt
      }
    }
  }
  return ''
}

// Helper function to format date for readability
export const formatPublishedDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export default async function DaftarBeritaPage() {
  const payload = await getPayload({ config: configPromise })

  const daftarBerita = await payload.find({
    collection: 'berita',
    limit: 5,
    overrideAccess: false,
    sort: '-publishedAt', // Urutkan berdasarkan tanggal publikasi terbaru
  })

  return (
    <div className="px-5 md:px-[96px] pt-20 pb-10 font-sans text-gray-800">
      <h1 className="text-2xl text-white text-center mb-2 font-bold">Berita Terbaru</h1>
      <p className="text-lg text-white text-center mb-10">
        Temukan informasi dan artikel menarik dari kami.
      </p>

      {daftarBerita.docs.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-12">
          Belum ada berita yang tersedia saat ini.
        </p>
      ) : (
        <div>
          <div className="grid mb-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {daftarBerita.docs.map((berita) => (
              <Link
                href={`/berita/${berita.slug}`}
                key={berita.id}
                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden
                         transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2
                         border border-gray-200 cursor-pointer"
              >
                {berita.image && (
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Media
                      resource={berita.image}
                      imgClassName="w-full h-full object-cover"
                      priority={true}
                      fill
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight line-clamp-2 min-h-[3rem]">
                    {berita.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {berita.publishedAt
                      ? formatPublishedDate(berita.publishedAt)
                      : 'Tanggal tidak tersedia'}
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed flex-grow mb-6 line-clamp-3 min-h-[4.5rem]">
                    {berita.short_description}
                  </p>
                  <span className="text-blue-600 font-semibold mt-auto self-start hover:underline">
                    Baca Selengkapnya
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <BeritaPagination />
        </div>
      )}
    </div>
  )
}
