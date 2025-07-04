import { Block } from 'payload'

export const PimpinanBlock: Block = {
  slug: 'pimpinan_block',
  labels: {
    singular: 'Pimpinan Card',
    plural: 'Pimpinan Cards',
  },

  fields: [
    {
      name: 'nama',
      type: 'text',
      label: 'Nama',
      required: true,
    },
    {
      name: 'jabatan',
      type: 'text',
      label: 'Jabatan',
      required: true,
    },
    {
      name: 'gambar',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar',
      required: true,
    },
  ],
}
