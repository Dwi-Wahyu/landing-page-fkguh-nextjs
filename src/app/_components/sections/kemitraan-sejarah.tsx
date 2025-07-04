'use client' // Diperlukan karena menggunakan hooks

import Image from 'next/image'
import { useInView } from '@/components/ui/use-in-view' // Import useInView custom hook
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  kemitraanImg: string
  sejarahText: string
}

export default function KemitraanSejarahSection({ kemitraanImg, sejarahText }: Props) {
  const { ref: sectionRef, inView: isSectionInView } = useInView<HTMLDivElement>({
    threshold: 0.2, // Sesuaikan threshold sesuai kebutuhan
    triggerOnce: true, // Animasi hanya sekali
  })

  return (
    <div
      ref={sectionRef} // Kaitkan ref ke div pembungkus utama
      className="flex flex-col md:flex-row py-10 gap-7"
    >
      {/* Bagian Kemitraan */}
      <div
        id="section_kemitraan"
        className={`flex-[7] transition-all duration-1000 ease-out ${
          isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="section-title-2">Kemitraan</h1>
        <Image
          src={kemitraanImg}
          alt="gambar-kemitraan"
          width={624}
          height={443}
          className="w-full h-auto"
        />
      </div>

      {/* Bagian Sejarah */}
      <div
        id="section_sejarah"
        className={`flex-[3] transition-all duration-1000 ease-out ${
          isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="section-title-2">Sejarah</h1>

        <p>{sejarahText}</p>

        <Button asChild className="mt-5 hover:-translate-y-1">
          <Link href="/sejarah">Selengkapnya</Link>
        </Button>
      </div>
    </div>
  )
}
