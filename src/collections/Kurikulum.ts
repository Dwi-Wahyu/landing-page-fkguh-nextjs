import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const Kurikulum: GlobalConfig = {
  slug: 'kurikulum',
  label: 'Kurikulum',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  admin: {
    description:
      'Dokumentasi visual terkait struktur kurikulum, mencakup mata kuliah, distribusi semester, dan capaian pembelajaran.',
  },
  fields: [
    {
      type: 'upload',
      name: 'gambar',
      label: 'Gambar Kurikulum',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}
