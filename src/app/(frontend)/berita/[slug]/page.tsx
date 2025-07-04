import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import { Media, User } from '@/payload-types'
import { formatPublishedDate } from '../page'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DetailBerita({ params }: Props) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  const rawData = await payload.find({
    collection: 'berita',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  if (!rawData.docs) return <div>Berita Tidak Ditemukan</div>

  const beritaData = rawData.docs[0]

  const image = beritaData.image as Media
  const author = beritaData.author as User[]

  const otherBerita = await payload.find({
    collection: 'berita',
    where: {
      slug: {
        not_equals: slug,
      },
    },
    limit: 3,
  })

  return (
    <div className="w-full px-0 md:px-[96px] pt-10 pb-5 md:pb-10 bg-background min-h-screen relative">
      <div className="fixed w-full z-30 h-screen -top-52 left-0">
        <Image
          fill
          src="/api/media/file/hero-background-thumbnail.jpg"
          className="z-10"
          alt="bg-image"
        />
        <div className="bg-gradient-to-t relative from-background to-transparent w-full h-full z-20"></div>
      </div>
      <div className="relative z-40">
        <Card className="rounded-t-4xl md:rounded-xl">
          <CardHeader>
            <div className="mb-4">
              <h1 className="font-bold text-xl ">{beritaData.title}</h1>
              <h1 className="mt-1 text-muted-foreground">
                {beritaData.publishedAt
                  ? formatPublishedDate(beritaData.publishedAt)
                  : 'Tanggal tidak tersedia'}{' '}
                - {author[0].Nama}{' '}
              </h1>
            </div>
            <div className="flex justify-center">
              <Image
                src={image.url ?? '/api/media_berita/file/not-found-berita-img.png'}
                alt={beritaData.title}
                width={500}
                height={400}
              />
            </div>
          </CardHeader>
          <CardContent>{beritaData.content && <RichText data={beritaData.content} />}</CardContent>
        </Card>

        <div className="mt-8 px-5 md:px-0">
          <h1 className="text-xl font-semibold mb-5">Berita Lainnya</h1>
          <div className="grid  grid-cols-1 md:grid-cols-3">
            {otherBerita.docs.map((berita) => {
              const otherBeritaImage = berita.image as Media

              return (
                <Link
                  key={berita.id}
                  href={`/berita/${berita.slug}`}
                  className="group duration-700 ease-out"
                >
                  <Card>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={
                            otherBeritaImage.url ??
                            '/api/media_berita/file/not-found-berita-img.png'
                          }
                          alt={berita.title}
                          width={0}
                          height={0}
                          className="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <h1 className="mt-2 font-semibold">{berita.title}</h1>
                      <h1 className="mt-1 text-sm line-clamp-3">{berita.short_description}</h1>
                      <h1 className="mt-1 text-muted-foreground">
                        {beritaData.publishedAt
                          ? formatPublishedDate(beritaData.publishedAt)
                          : 'Tanggal tidak tersedia'}
                      </h1>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
