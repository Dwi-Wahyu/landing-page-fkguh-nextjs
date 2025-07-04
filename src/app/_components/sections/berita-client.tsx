// components/sections/BeritaList.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { useInView } from '@/components/ui/use-in-view'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Berita, Media } from '@/payload-types' // Import tipe Berita dan Media dari Payload CMS
import { TBerita } from './berita'

// Definisikan tipe props untuk komponen ini
interface BeritaListProps {
  beritaData: TBerita[] | null | undefined // Sekarang langsung array Berita dari Payload
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return ''
  try {
    // Payload CMS date/datetime string should be parsable by Date
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (e) {
    console.error('Failed to parse date:', dateString, e)
    return dateString // Fallback to original string if parsing fails
  }
}

export const BeritaClientComponent: React.FC<BeritaListProps> = ({ beritaData }) => {
  const { ref: mainSectionRef, inView: isMainSectionInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: gridCardsRef, inView: isGridCardsInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Pastikan beritaData aman untuk diakses dan hanya berisi objek Berita
  const safeBeritaData = beritaData?.filter((berita): berita is Berita => berita !== null) || []

  const mainBerita = safeBeritaData[0]
  const otherBerita = safeBeritaData.slice(1)

  return (
    <div className="md:pt-10 md:px-10 md:pb-20">
      <h1
        ref={mainSectionRef}
        className={`section-title text-center transition-all duration-1000 ease-out ${
          isMainSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Daftar Berita
      </h1>

      {mainBerita && (
        <Link key={mainBerita.id} href={`/berita/${mainBerita.slug}`}>
          <Card
            className={`mb-5 transition-all group duration-700 ease-out ${
              isMainSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: isMainSectionInView ? '200ms' : '0ms' }}
          >
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={(mainBerita.image as Media)?.url ?? '/berita/not-found-berita-img.png'}
                  alt={
                    (mainBerita.image as Media)?.alt ?? mainBerita.title ?? 'Gambar Berita Utama'
                  }
                  width={320}
                  height={225}
                  className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h1 className="font-semibold">{mainBerita.title}</h1>
                {mainBerita.short_description && (
                  <h1 className="mt-2 line-clamp-[7]">{mainBerita.short_description}</h1>
                )}
                <h1 className="text-gray-700">{formatDate(mainBerita.publishedAt as string)}</h1>{' '}
                {/* Menggunakan publishedAt dari Payload */}
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {otherBerita.length > 0 && (
        <div>
          <div ref={gridCardsRef} className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {otherBerita.map((beritaNode, i) => {
              // beritaNode sudah merupakan objek Berita
              if (!beritaNode) return null

              return (
                <Link
                  key={beritaNode.id}
                  href={`/berita/${beritaNode.id}`} // Sesuaikan ini dengan cara Anda membuat slug berita di Payload
                >
                  <Card
                    className={`transition-all duration-700 group ease-out ${
                      isGridCardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{
                      transitionDelay: isGridCardsInView ? `${i * 100 + 400}ms` : '0ms',
                    }}
                  >
                    <CardContent>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={
                            (beritaNode.image as Media)?.url ?? '/berita/not-found-berita-img.png'
                          }
                          alt={
                            (beritaNode.image as Media)?.alt ?? beritaNode.title ?? 'Gambar Berita'
                          }
                          width={320}
                          height={225}
                          className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <h1 className="mt-3 line-clamp-3 font-semibold">{beritaNode.title}</h1>

                      <h1 className="text-gray-700 text-sm mt-1">
                        {formatDate(beritaNode.publishedAt as string)}
                      </h1>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="flex justify-center mt-5">
            <Button>Lihat Berita Lainnya</Button>
          </div>
        </div>
      )}
    </div>
  )
}
