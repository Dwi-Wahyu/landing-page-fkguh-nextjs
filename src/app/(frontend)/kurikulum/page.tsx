import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Media } from '@/payload-types'

export default async function KurikulumPage() {
  const payload = await getPayload({ config: configPromise })

  const pageData = await payload.findGlobal({
    slug: 'kurikulum',
  })

  if (!pageData) return <div>Halaman tidak ditemukan</div>

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
      <div className="relative z-40">
        <Card className="rounded-t-4xl md:rounded-xl">
          <CardHeader>
            <h1 className="font-bold text-xl">Kurikulum</h1>
          </CardHeader>
          <CardContent>
            {pageData.gambar?.map((each, idx) => {
              const eachGambar = each as Media

              return (
                <Image
                  key={idx}
                  src={eachGambar.url ?? '/api/media/file/not-found.png'}
                  alt={eachGambar.alt}
                  width={0}
                  height={0}
                  className="w-full h-full"
                />
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
