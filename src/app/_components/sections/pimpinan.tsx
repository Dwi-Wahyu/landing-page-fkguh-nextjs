'use client'

import { useInView } from '@/components/ui/use-in-view'
import { Media, Pimpinan } from '@/payload-types'
import Image from 'next/image'

type PimpinanProps =
  | {
      pimpinan: number | Pimpinan
      id?: string | null
    }[]
  | null
  | undefined

type Props = {
  data: PimpinanProps
}

export const PimpinanSection: React.FC<Props> = ({ data }) => {
  const { ref: pimpinanSectionRef, inView: isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <div id="section_pimpinan" ref={pimpinanSectionRef} className="py-10">
      <h1
        className={`section-title text-center mb-12 text-4xl font-extrabold  transition-all ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        Pimpinan Fakultas
      </h1>

      {data?.length && (
        <div className="container mx-auto px-4">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
            {' '}
            {/* Tambahkan items-stretch di sini */}
            {data.map((each, i) => {
              const pimpinan = each.pimpinan as Pimpinan
              const media = pimpinan.image as Media

              return (
                <div
                  className={`relative cursor-pointer flex flex-col overflow-hidden rounded-xl shadow-lg
                    transform transition-all duration-500 ease-in-out group
                    hover:scale-105 hover:shadow-xl
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  key={i}
                >
                  {/* Bagian Gambar */}
                  <div className="relative w-full h-96 overflow-hidden rounded-t-xl">
                    <Image
                      src={media.url ?? '/'}
                      className="object-cover w-full h-full group-hover:scale-110 transition-all ease-in-out duration-500"
                      width={400}
                      height={600}
                      alt={pimpinan.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Bagian Informasi Pimpinan - Pastikan Tinggi Seragam */}
                  <div
                    className="relative flex-grow flex flex-col justify-center items-center p-6 text-center bg-white/90 dark:bg-gray-800/90
                                    transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white
                                    min-h-[120px]"
                  >
                    <h1 className=" font-bold mb-1 transition-all duration-300">{pimpinan.name}</h1>
                    <h2 className="text-sm text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-white">
                      {pimpinan.jabatan}
                    </h2>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
