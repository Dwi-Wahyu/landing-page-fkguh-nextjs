import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const Sejarah: GlobalConfig = {
  slug: 'sejarah',
  label: 'Sejarah Panjang',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  admin: {
    description:
      'Uraian tentang latar belakang pendirian, perkembangan, dan pencapaian penting dari fakultas.',
  },
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Sejarah Panjang',
      required: true,
    },
  ],
}
