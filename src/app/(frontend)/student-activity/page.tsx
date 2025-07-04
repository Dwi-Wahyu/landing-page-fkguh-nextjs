import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Media } from '@/payload-types'

export default async function StudentActivityNotFound() {
  const payload = await getPayload({ config: configPromise })

  const pageData = await payload.find({
    collection: 'student_activity',
  })

  if (!pageData) return <div>Activity Not Found</div>

  const data = pageData.docs

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
            <h1 className="font-bold text-xl">Student Activity</h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.map((activity) => {
                const image = activity.image as Media
                return (
                  <div key={activity.id} className="relative overflow-hidden rounded-lg group">
                    <div className="relative w-full h-64">
                      <Image
                        src={image.url ?? '/api/media_berita/file/not-found-berita-img.png'}
                        alt={image.alt || activity.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h2 className="text-lg font-semibold transform transition-transform duration-150 group-hover:-translate-y-10">
                        {activity.title}
                      </h2>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-200 group-hover:translate-y-0">
                        <p className="text-sm line-clamp-3">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
