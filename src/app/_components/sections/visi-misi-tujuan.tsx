'use client'

import React from 'react'
import Image from 'next/image' // Import Image dari Next.js
import { Card, CardContent } from '@/components/ui/card' // Sesuaikan path
import { InfoCardLandingPage } from './info-card-landing-page'
import { useInView } from '@/components/ui/use-in-view'

interface CardItem {
  title: string
  icon: string // Path ke file SVG, misal "/icons/visi.svg"
  description: string
}

interface InfoItem {
  amount: string
  icon: string
  title: string
}

interface VisiMisiSectionProps {
  data: {
    visi: string
    misi: string
    tujuan: string
  }
}

export const VisiMisiTujuanSection: React.FC<VisiMisiSectionProps> = ({ data }) => {
  const { ref: visiSectionRef, inView: isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Data untuk InfoCardLandingPage
  const infos: InfoItem[] = [
    { amount: '11', icon: '/api/media/file/staff.svg', title: 'DEPARTEMEN' },
    { amount: '11', icon: '/api/media/file/prodi.svg', title: 'PROGRAM STUDI' },
    { amount: '317', icon: '/api/media/file/staff.svg', title: 'STAFF' },
    { amount: '3886', icon: '/api/media/file/mahasiswa.svg', title: 'MAHASISWA' },
  ]

  // Data untuk cards Visi, Misi, Tujuan berdasarkan data dari TinaCMS
  const cards: CardItem[] = [
    {
      title: 'Visi',
      icon: '/api/media/file/visi.svg',
      description: data.visi,
    },
    {
      title: 'Misi',
      icon: '/api/media/file/misi.svg',
      description: data.misi,
    },
    {
      title: 'Tujuan',
      icon: '/api/media/file/tujuan.svg',
      description: data.tujuan,
    },
  ]

  return (
    <div id="section_visi_misi_tujuan" ref={visiSectionRef}>
      <h1
        className={`section-title text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Visi Misi dan Tujuan Fakultas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {cards.map((card, i) => {
          return (
            <Card
              key={i}
              className={`transition-all duration-1000 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <CardContent>
                {/* Menggunakan Image langsung untuk ikon SVG */}
                <Image
                  src={card.icon} // Path ke file SVG
                  alt={card.title + ' icon'}
                  width={80} // Sesuaikan ukuran ikon
                  height={80} // Sesuaikan ukuran ikon
                  className="w-[80px] h-[80px]" // Kelas Tailwind untuk ukuran
                />
                <h1 className="my-3 font-semibold text-xl">{card.title}</h1>
                <h1>{card.description}</h1>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <InfoCardLandingPage
        infos={infos}
        animationClass={isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        startCount={isVisible}
      />
    </div>
  )
}
