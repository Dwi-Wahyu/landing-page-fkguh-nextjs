'server-only'

import { TBanksoalSearchParams } from '../validations/banksoal-search-params'
import { getPayload } from 'payload'

import configPromise from '@payload-config'

export async function getSoal(input: TBanksoalSearchParams) {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'bank-soal',
    where: {
      judul: {
        contains: input.judul,
      },
    },
    limit: input.limit,
  })

  return { ...data }
}
