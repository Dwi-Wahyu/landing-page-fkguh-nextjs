import { CollectionConfig } from 'payload'

export const Pimpinan: CollectionConfig = {
  slug: 'pimpinan',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Pimpinan',
    plural: 'Pimpinan',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Nama ',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'jabatan',
      type: 'text',
      required: true,
    },
  ],
}
