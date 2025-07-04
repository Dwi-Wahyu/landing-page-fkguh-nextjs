import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const ProfilLulusan: GlobalConfig = {
  slug: 'profil_lulusan',
  label: 'Profil Lulusan',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  admin: {
    description:
      'Informasi mengenai kompetensi utama, sikap, dan capaian pembelajaran yang diharapkan dimiliki oleh lulusan program studi.',
  },
  fields: [
    {
      type: 'richText',
      name: 'content',
      label: 'Profil Lulusan',
      required: true,
    },
  ],
}
