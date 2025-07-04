'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export type SambutanKaprodiItem = {
  slug: string
  name: string
  image: Media
  program_studi: string
  sambutan_singkat: string
}

export const SambutanCard = ({
  slug,
  name,
  image,
  program_studi,
  sambutan_singkat,
}: SambutanKaprodiItem) => {
  return (
    <div className="relative rounded-lg shadow-md flex flex-col sm:flex-row w-full max-w-[836px] h-auto sm:h-[350px]">
      {/* Gambar */}
      <div className="w-full shadow-lg rounded-t-lg md:rounded-tl-lg md:rounded-bl-lg sm:w-1/3 h-[220px] sm:h-full bg-gradient-to-tl from-primary to-[#92C8FF] flex items-end justify-center relative">
        <Image
          src={image.url ?? '/api/media/file/not-found.png'}
          alt={name}
          width={562}
          height={398}
          className="w-[90%] h-[90%] object-contain "
        />

        <Image
          src="/api/media/file/sambutan-quote.svg"
          alt="quote svg"
          width={70}
          height={70}
          className="absolute hidden sm:block -top-8 left-[15.2rem]"
        />

        <Image
          src="/api/media/file/sambutan-quote.svg"
          alt="quote svg"
          width={40}
          height={40}
          className="absolute block sm:hidden rounded-t-xl top-full left-4 -translate-y-1/2"
        />
      </div>

      {/* Teks */}
      <div className="bg-white rounded-b-lg md:rounded-bl-none md:rounded-tr-lg md:rounded-br-lg w-full sm:w-2/3 p-6 flex flex-col justify-between text-sm text-gray-800 space-y-4">
        <div>
          <p className="text-gray-800 text-base leading-relaxed line-clamp-5">
            {sambutan_singkat}...{' '}
            <Link
              href={`/sambutan-kaprodi/${slug}`}
              className="text-blue-500 hover:underline font-semibold"
            >
              Baca Lebih Lanjut
            </Link>
          </p>
        </div>
        <div>
          <p className="font-semibold text-base">{name}</p>
          <p className="text-gray-500 text-sm">Ketua {program_studi}</p>
        </div>
      </div>
    </div>
  )
}
