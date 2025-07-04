import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Media } from '@/payload-types'
import { VideoWithFallback } from '@/app/_components/video-with-fallback'

export default async function VideoProfilPage() {
  const payload = await getPayload({ config: configPromise })

  const pageData = await payload.findGlobal({
    slug: 'video_profil',
  })

  if (!pageData || !pageData.video) return <div>Halaman tidak ditemukan</div>

  const video = pageData.video as Media

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
            <h1 className="font-bold text-xl">Video Profil</h1>
          </CardHeader>

          <CardContent>
            <VideoWithFallback
              src={video.url ?? undefined}
              fallbackImage="/api/media/file/video-not-found.webp"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
