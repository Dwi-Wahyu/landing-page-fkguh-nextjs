'use client'

import { useState } from 'react'

export function VideoWithFallback({
  src,
  fallbackImage,
}: {
  src: string | undefined
  fallbackImage: string
}) {
  const [isError, setIsError] = useState(false)

  if (isError) {
    return (
      <img
        src={fallbackImage}
        alt="Fallback gambar video"
        className="w-full max-h-[500px] rounded-lg object-cover"
      />
    )
  }

  return (
    <video
      controls
      poster="/api/media/file/hero-background-thumbnail.jpg"
      className="w-full max-h-[500px] rounded-lg"
      onError={() => setIsError(true)}
    >
      <source src={src} type="video/mp4" />
      Browser Anda tidak mendukung tag video.
    </video>
  )
}
