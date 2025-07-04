import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const SaranaDanPrasarana: GlobalConfig = {
  slug: 'sarana_dan_prasarana',
  label: 'Sarana dan Prasarana',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  admin: {
    description:
      'Informasi mengenai fasilitas fisik dan penunjang akademik yang tersedia untuk mendukung proses pembelajaran, penelitian, dan kegiatan kemahasiswaan.',
  },
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Deskripsi Sarana dan Prasarana',
      required: true,
    },
  ],
}
