'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button' // Tambahkan jika ingin tombol Lihat
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination' // Tambahkan jika ingin paginasi
import { Input } from '@/components/ui/input'
import { getSoal } from '../_lib/queries/banksoal-queries'

import { parseAsInteger, useQueryState } from 'nuqs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { use } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Media } from '@/payload-types'
import { addJumlahSoalDilihat } from '../_lib/actions/banksoal-actions'
import { useRouter } from 'next/navigation'

type TBanksoalData = Promise<Awaited<ReturnType<typeof getSoal>>>

type Props = {
  promises: TBanksoalData
}

export default function BanksoalTable({ promises }: Props) {
  const data = use(promises)

  const router = useRouter()

  const [judul, setJudul] = useQueryState('judul', {
    clearOnDefault: true,
    shallow: false,
    defaultValue: '',
  })
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(5))

  async function handleLihat(slug: string, jumlahDilihat: number, fileUrl: string) {
    console.log(jumlahDilihat)

    const updateActions = await addJumlahSoalDilihat(slug, jumlahDilihat)

    console.log(updateActions)

    if (updateActions.success) {
      router.push(fileUrl)
    }
  }

  return (
    <Card className="rounded-t-4xl md:rounded-xl">
      <CardHeader>
        <h1 className="font-bold text-xl mb-5">Daftar Soal</h1>

        <div className="flex justify-between items-center">
          <div className="relative w-1/3">
            <Input
              type="text"
              value={judul}
              onChange={(ev) => setJudul(ev.target.value)}
              placeholder="Cari..."
              className="pl-8"
            />
            <svg
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.307l4.097 4.098a1 1 0 01-1.414 1.414l-4.098-4.097A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Select
            onValueChange={(val) => setLimit(parseInt(val), { shallow: false })}
            defaultValue={limit.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Tampilkan Jumlah Soal`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Hit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.docs.map((soal, index) => {
              const fileSoal = soal.fileSoal as Media

              return (
                <TableRow key={soal.id}>
                  <TableCell className="font-medium">{index + 1}.</TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        handleLihat(
                          soal.slug as string,
                          soal.jumlahDilihat as number,
                          fileSoal.url as string,
                        )
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {soal.judul}
                    </button>
                  </TableCell>
                  <TableCell>
                    {/* Pastikan penulis ada dan memiliki properti Nama */}
                    {soal.penulis && typeof soal.penulis === 'object' && 'Nama' in soal.penulis
                      ? (soal.penulis as { Nama: string }).Nama
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleLihat(
                          soal.slug as string,
                          soal.jumlahDilihat as number,
                          fileSoal.url as string,
                        )
                      }
                      className="px-3 cursor-pointer py-1 text-xs"
                    >
                      Dilihat: {soal.jumlahDilihat || 0}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Bagian bawah tabel: menampilkan jumlah data dan paginasi */}
        <div className="flex justify-between items-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant={'outline'}
                  disabled={!data.hasPrevPage}
                  onClick={() => setPage(page - 1, { shallow: false })}
                >
                  <ChevronLeft />
                </Button>
              </PaginationItem>
              {data.hasPrevPage && (
                <PaginationItem>
                  <Button variant={'outline'} onClick={() => setPage(page - 1, { shallow: false })}>
                    {data.prevPage}
                  </Button>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
              {data.hasNextPage && (
                <PaginationItem>
                  <Button variant={'outline'} onClick={() => setPage(page + 1, { shallow: false })}>
                    {data.nextPage}
                  </Button>
                </PaginationItem>
              )}
              <PaginationItem>
                <Button
                  variant={'outline'}
                  disabled={!data.hasNextPage}
                  onClick={() => setPage(page + 1, { shallow: false })}
                >
                  <ChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}
