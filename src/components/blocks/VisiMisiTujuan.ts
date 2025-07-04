import { Block } from 'payload'

export const VisiMisiTujuanSection: Block = {
  slug: 'visi_misi_tujuan_section',
  labels: {
    singular: 'Visi Misi Tujuan Section',
    plural: 'Visi Misi Tujuan Sections',
  },
  // imageURL: '/path/to/visi-misi-preview.png',
  fields: [
    {
      name: 'visi',
      type: 'textarea', // Menggunakan 'text' untuk string tunggal seperti di TinaCMS
      label: 'Visi Fakultas',
      required: true,
    },
    {
      name: 'misi',
      type: 'textarea', // Menggunakan 'text' untuk string tunggal
      label: 'Misi Fakultas',
      required: true,
    },
    {
      name: 'tujuan',
      type: 'textarea', // Menggunakan 'text' untuk string tunggal
      label: 'Tujuan Fakultas',
      required: true,
    },
  ],
}
