import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Teks Alternatif (Deskripsi Gambar)',
      required: true,
    },
  ],
  upload: true,
}
