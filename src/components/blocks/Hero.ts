import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  imageURL: '/api/media/file/hero-preview.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Judul Utama',
      required: true,
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
