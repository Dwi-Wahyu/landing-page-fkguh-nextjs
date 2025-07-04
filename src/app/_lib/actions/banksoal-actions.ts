'use server'

import { getPayload } from 'payload'

import configPromise from '@payload-config'

export async function addJumlahSoalDilihat(slug: string, jumlahDilihat: number) {
  const payload = await getPayload({ config: configPromise })

  const update = await payload.update({
    collection: 'bank-soal',
    where: {
      slug: {
        equals: slug,
      },
    },
    data: {
      jumlahDilihat: jumlahDilihat + 1,
    },
  })

  console.log(update)

  return { success: true }
}
