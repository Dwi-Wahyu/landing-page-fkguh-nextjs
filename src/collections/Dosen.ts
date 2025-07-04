import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { daftarProdi } from '@/data/program-studi'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Dosen: CollectionConfig = {
  slug: 'dosen',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Dosen',
    plural: 'Dosen',
  },
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Nama Dosen',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'select',
      name: 'program_studi',
      label: 'Program Studi',
      required: true,
      options: daftarProdi.map((prodi) => ({
        label: prodi,
        value: prodi,
      })),
    },
    ...slugField('name'),
  ],
}
