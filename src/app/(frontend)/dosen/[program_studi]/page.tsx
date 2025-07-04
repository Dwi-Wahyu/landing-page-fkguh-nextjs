import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { Media } from '@/payload-types'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default async function DosenPage({
  params,
}: {
  params: Promise<{ program_studi: string }>
}) {
  const { program_studi } = await params

  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'dosen',
    where: {
      program_studi: {
        equals: formatProgramStudiSlug(program_studi),
      },
    },
    select: {
      name: true,
      image: true,
      description: true,
      slug: true,
    },
  })

  if (!data) return <div>Halaman tidak ditemukan</div>

  return (
    <div className="w-full px-0 md:px-[96px] pt-32 pb-5 md:pb-10 bg-background min-h-screen relative">
      <div className="fixed w-full z-30 h-screen -top-52 left-0">
        <Image
          fill
          src="/api/media/file/hero-background-thumbnail.jpg"
          className="z-10"
          alt="bg-image"
        />
        <div className="bg-gradient-to-t relative from-background to-transparent w-full h-full z-20"></div>
      </div>
      <div className="relative z-40 ">
        <Card className="rounded-t-4xl md:rounded-xl">
          <CardHeader>
            <h1 className="font-bold text-xl">Dosen {formatProgramStudiSlug(program_studi)}</h1>
          </CardHeader>
          <CardContent className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {data.docs.map((value, idx) => {
              const image = value.image as Media

              return (
                <div key={idx} className="relative shadow-lg ">
                  <div className="bg-gradient-to-tl from-primary to-blue-300 rounded-lg">
                    <Image
                      src={image.url ?? '/api/media/file/not-found.png'}
                      alt=""
                      className="w-full rounded-lg h-full"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div className="absolute bottom-0 rounded-b-lg left-0 bg-white px-4 py-3">
                    <h1 className="text-sm font-semibold">{value.name}</h1>
                    <h1 className="line-clamp-2 text-sm">{value.description}</h1>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function formatProgramStudiSlug(slug: string): string {
  return slug
    .split('-') // Pisahkan berdasarkan tanda hubung
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi setiap kata
    .join(' ') // Gabungkan kembali dengan spasi
}
