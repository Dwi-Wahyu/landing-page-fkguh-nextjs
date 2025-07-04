import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const LayananMahasiswa: CollectionConfig = {
  slug: 'layanan_mahasiswa',
  labels: {
    plural: 'Layanan Mahasiswa',
    singular: 'Layanan Mahasiswa',
  },
  admin: {
    useAsTitle: 'judul',
  },
  fields: [
    {
      name: 'judul',
      label: 'Judul',
      type: 'text',
      required: true,
    },
    {
      label: 'Link Google Form',
      name: 'link',
      type: 'text',
      required: true,
    },
    ...slugField('judul'),
  ],
}
