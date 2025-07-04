import Image from 'next/image'
import BanksoalTable from '@/app/_components/banksoal-table'
import { getSoal } from '@/app/_lib/queries/banksoal-queries'
import { banksoalSearchParams } from '@/app/_lib/validations/banksoal-search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function BankSoalPage(props: IndexPageProps) {
  const searchParams = await props.searchParams
  const search = banksoalSearchParams.parse(searchParams)

  const promises = getSoal(search)

  return (
    <div className="w-full px-0 md:px-[96px] pt-32 md:pb-10 bg-background min-h-screen relative">
      <div className="fixed w-full z-30 h-screen -top-52 left-0">
        <Image
          fill
          src="/api/media/file/hero-background-thumbnail.jpg"
          className="z-10"
          alt="bg-image"
        />
        <div className="bg-gradient-to-t relative from-background to-transparent w-full h-full z-20"></div>
      </div>
      <div className="relative z-40">
        <Suspense fallback={<h1>Loading . . .</h1>}>
          <BanksoalTable promises={promises} />
        </Suspense>
      </div>
    </div>
  )
}
