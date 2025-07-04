'use client'

import { Media } from '@/payload-types'
import { useEffect, useState } from 'react'

interface HeroData {
  video_profil_fakultas: number | Media
  main_heading: string
}

interface Props {
  data: HeroData
}

export default function HeroSection({ data }: Props) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  useEffect(() => {
    setIsOverlayVisible(true)
  }, [])

  const videoProfil = data.video_profil_fakultas as Media

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {videoProfil.url && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/api/media/file/hero-background-thumbnail.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={videoProfil.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div
        className={` relative z-10 w-full px-5 md:px-[96px] pt-5 pb-14 flex flex-col justify-end h-full bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-1000 ease-in-out ${
          isOverlayVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="font-extrabold text-5xl text-white">{data.main_heading}</h1>
      </div>
    </div>
  )
}
