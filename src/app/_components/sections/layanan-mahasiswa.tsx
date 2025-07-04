'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useInView } from '@/components/ui/use-in-view'

// Gunakan interface LayananMahasiswa yang Anda berikan
export interface LayananMahasiswa {
  id: number
  judul: string
  link: string
  slug?: string | null
  slugLock?: boolean | null
  updatedAt: string
  createdAt: string
}

// Perbaiki tipe TLayananMahasiswa
// Sekarang, 'data' akan langsung berupa array LayananMahasiswa
type TLayananMahasiswa = LayananMahasiswa[] | null | undefined

interface LayananMahasiswaSectionProps {
  data: TLayananMahasiswa
}

export const LayananMahasiswaSection: React.FC<LayananMahasiswaSectionProps> = ({ data }) => {
  const { ref: layananSectionRef, inView: isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <div id="section_layanan_mahasiswa" ref={layananSectionRef} className="py-10">
      <h1
        className={`section-title text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Layanan Mahasiswa
      </h1>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {data?.map((layanan) => {
          return (
            <a
              key={layanan.id}
              href={layanan.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-200 ease-in-out hover:scale-105 transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <Card className="w-full h-full flex flex-col justify-center hover:shadow-lg  items-center">
                <CardContent className={`flex h-full justify-center items-center text-center p-4`}>
                  <h1 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                    {layanan.judul}
                  </h1>
                </CardContent>
              </Card>
            </a>
          )
        })}
      </div>
      {!data ||
        (data.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <h1>Belum ada layanan mahasiswa yang tersedia.</h1>
          </div>
        ))}
    </div>
  )
}
