// components/sections/InfoCardLandingPage.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image' // Import Image dari Next.js
import { Card, CardContent } from '@/components/ui/card' // Sesuaikan path import shadcn/ui Anda

// Definisikan tipe untuk info card
// icon sekarang adalah string (path ke SVG)
interface InfoItem {
  amount: string // Angka dalam bentuk string
  icon: string // Path ke file SVG, misal "/icons/departemen.svg"
  title: string
}

interface InfoCardLandingPageProps {
  infos: InfoItem[]
  animationClass?: string
  startCount: boolean
}

export const InfoCardLandingPage: React.FC<InfoCardLandingPageProps> = ({
  infos,
  animationClass = '',
  startCount,
}) => {
  const [displayAmounts, setDisplayAmounts] = useState<Map<number, number>>(
    () => new Map(infos.map((_, i) => [i, 0])),
  )
  const animationFrameRefs = useRef<Map<number, number | null>>(new Map())

  const animateCount = (index: number, target: number) => {
    const duration = 2000 // Durasi animasi dalam ms
    const startTime = performance.now()

    const step = (now: DOMHighResTimeStamp) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentAmount = Math.floor(progress * target)

      setDisplayAmounts((prevAmounts) => {
        const newAmounts = new Map(prevAmounts)
        newAmounts.set(index, currentAmount)
        return newAmounts
      })

      if (progress < 1) {
        animationFrameRefs.current.set(index, requestAnimationFrame(step))
      } else {
        setDisplayAmounts((prevAmounts) => {
          const newAmounts = new Map(prevAmounts)
          newAmounts.set(index, target)
          return newAmounts
        })
        animationFrameRefs.current.set(index, null)
      }
    }

    if (animationFrameRefs.current.get(index)) {
      cancelAnimationFrame(animationFrameRefs.current.get(index)!)
    }
    animationFrameRefs.current.set(index, requestAnimationFrame(step))
  }

  useEffect(() => {
    if (startCount) {
      const timeouts: NodeJS.Timeout[] = []
      infos.forEach((info, index) => {
        const timeoutId = setTimeout(() => {
          animateCount(index, parseInt(info.amount))
        }, index * 100)

        timeouts.push(timeoutId)
      })

      return () => {
        timeouts.forEach(clearTimeout)
        animationFrameRefs.current.forEach((frameId) => {
          if (frameId) cancelAnimationFrame(frameId)
        })
        animationFrameRefs.current.clear()
      }
    } else {
      setDisplayAmounts(new Map(infos.map((_, i) => [i, 0])))
      animationFrameRefs.current.forEach((frameId) => {
        if (frameId) cancelAnimationFrame(frameId)
      })
      animationFrameRefs.current.clear()
    }
  }, [startCount, infos])

  return (
    <Card className={`mt-[80px] transition-all duration-700 delay-500 ${animationClass}`}>
      <CardContent className="text-[#348CE5] grid grid-cols-2 gap-4 md:grid-cols-4">
        {infos.map((info, i) => {
          return (
            <div
              key={i}
              className={`flex items-center flex-col transition-all duration-700 ${animationClass}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Menggunakan Image langsung untuk ikon SVG */}
              <Image
                src={info.icon} // Path ke file SVG
                alt={info.title + ' icon'}
                width={48} // Sesuaikan ukuran ikon sesuai kebutuhan
                height={48} // Sesuaikan ukuran ikon sesuai kebutuhan
                className="w-12 h-12" // Kelas Tailwind untuk ukuran
              />
              <h1 className="font-bold text-3xl mt-1">{displayAmounts.get(i) || 0}</h1>
              <h1 className="font-semibold">{info.title}</h1>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
