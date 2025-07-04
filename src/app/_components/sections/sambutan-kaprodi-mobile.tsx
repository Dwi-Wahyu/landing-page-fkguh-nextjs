'use client' // Diperlukan karena menggunakan hooks

import React, { useState, useRef, useEffect } from 'react'
import { SambutanCard, SambutanKaprodiItem } from '../sambutan-card' // Sesuaikan path import
import { useInView } from '@/components/ui/use-in-view'

type Props = {
  data: SambutanKaprodiItem[] | undefined
}

export default function SambutanKaprodiMobile({ data }: Props) {
  const initialVisibleCount = 3
  // Pastikan data adalah array kosong jika undefined untuk menghindari error
  const safeData = data || []
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]) // Untuk referensi setiap kartu
  const [cardInViewStatus, setCardInViewStatus] = useState<{
    [key: number]: boolean
  }>({}) // Melacak status inView setiap kartu

  // Gunakan satu useInView untuk keseluruhan section
  const { ref: sectionRef, inView: isSectionInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Logika Intersection Observer untuk setiap kartu secara individual
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Lakukan pengecekan data sebelum mengakses .length
    if (isSectionInView && safeData.length > 0) {
      // Hanya observasi kartu yang saat ini terlihat
      cardRefs.current = cardRefs.current.slice(0, visibleCount)

      safeData.slice(0, visibleCount).forEach((_, index) => {
        const el = cardRefs.current[index]
        if (el) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setCardInViewStatus((prev) => ({ ...prev, [index]: true }))
                // Opsional: disconnect observer setelah terlihat
                // observer.disconnect();
              }
            },
            { threshold: 0.1 },
          )
          observer.observe(el)
          observers.push(observer)
        }
      })
    }

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [isSectionInView, safeData, visibleCount]) // Gunakan safeData di dependency array

  const showMore = () => {
    // Pastikan data ada sebelum mengakses .length
    setVisibleCount(safeData.length) // Tampilkan semua kartu
  }

  return (
    <div ref={sectionRef} className="py-10">
      <h1 className="text-[32px] md:mb-[20px] mb-[10px] font-bold text-center">Sambutan Kaprodi</h1>

      <div className="grid grid-cols-1 gap-5 relative">
        {/* Pengecekan data.length sudah aman karena menggunakan safeData */}
        {safeData.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada sambutan yang tersedia.</p>
        ) : (
          <>
            {/* Iterasi juga menggunakan safeData */}
            {safeData.slice(0, visibleCount).map((sambutan, idx) => (
              <div
                key={`${sambutan.name}-${idx}`}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[idx] = el
                }} // Set ref untuk setiap kartu
                className={`transition-all duration-700 ease-out ${
                  cardInViewStatus[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  // Animasi hanya dipicu jika section terlihat (dari useInView utama)
                  // dan kartu itu sendiri sudah masuk viewport (dari IntersectionObserver individual)
                  transitionDelay: isSectionInView ? `${idx * 150}ms` : '0ms',
                }}
              >
                <SambutanCard
                  slug={sambutan.slug}
                  name={sambutan.name}
                  program_studi={sambutan.program_studi}
                  sambutan_singkat={sambutan.sambutan_singkat}
                  image={sambutan.image}
                />
              </div>
            ))}

            {/* Pengecekan visibleCount < data.length juga menggunakan safeData */}
            {visibleCount < safeData.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={showMore}
                  className="px-6 py-2 text-sm font-semibold rounded-full text-gray-700 bg-gradient-to-t from-background to-transparent shadow-md"
                >
                  Selengkapnya
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
