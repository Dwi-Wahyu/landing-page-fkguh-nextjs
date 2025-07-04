// components/sections/SambutanKaprodiDekstop.tsx
'use client' // Diperlukan karena menggunakan hooks dan DOM manipulation

import React, { useRef, useEffect, useMemo } from 'react'
import { SambutanCard, SambutanKaprodiItem } from '../sambutan-card' // Sesuaikan path import

type Props = {
  data: SambutanKaprodiItem[] | undefined
}

export default function SambutanKaprodiDekstop({ data }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Ukuran kartu berdasarkan w-[1036px] dari SambutanCard
  const cardWidth = 1036 // dari w-[1036px]
  const gapWidth = 16 // gap-4 (4 * 4px = 16px)

  // Duplikasikan data untuk efek infinite scroll yang mulus
  const duplicatedData = useMemo(() => {
    if (!data || data.length === 0) return []
    // Untuk loop yang mulus, duplikasikan data setidaknya dua kali
    // atau lebih jika jumlah kartu sedikit, agar ada cukup konten
    // yang melewati layar sebelum loop reset.
    // Misalnya, jika Anda memiliki 3 kartu, duplikasikan menjadi [1,2,3,1,2,3]
    return [...data, ...data]
  }, [data])

  const scrollStyles = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        '--scroll-duration': '0s',
        '--translate-x-value': '0px',
      }
    }

    // Hitung total lebar satu set data asli (tanpa duplikasi)
    const totalWidthOfOneSet = data.length * cardWidth + (data.length - 1) * gapWidth

    // Durasi scroll akan bergantung pada total lebar satu set data
    // Semakin lebar, semakin lama durasinya agar kecepatan terlihat konsisten.
    // Sesuaikan pembagi (misal 50) untuk mengatur kecepatan. Angka lebih kecil = lebih cepat.
    const scrollSpeedPxPerSecond = 50 // Contoh: 50 piksel per detik
    const durationSeconds = totalWidthOfOneSet / scrollSpeedPxPerSecond

    return {
      '--scroll-duration': `${durationSeconds}s`,
      '--translate-x-value': `-${totalWidthOfOneSet}px`, // Jarak total yang harus digeser untuk satu set
    }
  }, [data])

  // Intersection Observer untuk menghentikan/melanjutkan animasi
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (scrollContainerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (scrollContainerRef.current) {
              if (entry.isIntersecting) {
                scrollContainerRef.current.style.animationPlayState = 'running'
              } else {
                scrollContainerRef.current.style.animationPlayState = 'paused'
              }
            }
          })
        },
        { threshold: 0 }, // Pemicu ketika 0% elemen terlihat
      )
      observer.observe(scrollContainerRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [data]) // Re-run effect jika data berubah

  return (
    <div className="py-10">
      <h1 className="text-[32px] md:mb-[20px] mb-[10px] font-bold text-center">Sambutan Kaprodi</h1>

      <div className="relative overflow-x-hidden">
        {' '}
        {/* Penting untuk menyembunyikan scrollbar dan memungkinkan animasi keluar */}
        {!data ? (
          <p className="text-center text-gray-500">Tidak ada sambutan yang tersedia.</p>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-4 py-10 w-max animate-card-scroll" // w-max memastikan div cukup lebar untuk semua kartu
            style={scrollStyles as React.CSSProperties} // Cast ke React.CSSProperties
          >
            {duplicatedData.map((sambutan, idx) => (
              <SambutanCard
                key={`${sambutan.name}-${idx}`} // Gunakan kombinasi nama dan index sebagai key yang unik
                slug={sambutan.slug}
                name={sambutan.name}
                program_studi={sambutan.program_studi}
                sambutan_singkat={sambutan.sambutan_singkat}
                image={sambutan.image}
              />
            ))}
          </div>
        )}
      </div>

      {/* Definisi Keyframes CSS */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Nilai var(--translate-x-value) akan diisi oleh inline style dari React */
            transform: translateX(var(--translate-x-value));
          }
        }

        .animate-card-scroll {
          animation: scroll-left var(--scroll-duration) linear infinite;
          will-change: transform; /* Memberi tahu browser untuk mengoptimalkan animasi transform */
        }

        /* Opsional: Pause animasi saat hover */
        .animate-card-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
