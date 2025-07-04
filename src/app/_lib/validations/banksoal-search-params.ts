// src/app/_lib/validations/kegiatanSearchParams.ts
import { createSearchParamsCache, parseAsString, parseAsInteger } from 'nuqs/server'

export const banksoalSearchParams = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  limit: parseAsInteger.withDefault(5),
  judul: parseAsString.withDefault(''),
})

export type TBanksoalSearchParams = {
  page: number
  perPage: number
  limit: number
  judul: string
}
