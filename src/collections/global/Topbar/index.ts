import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { tautan } from '@/fields/tautan'
import { GlobalConfig } from 'payload'

export const Topbar: GlobalConfig = {
  slug: 'topbar',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [tautan()],
    },
  ],
}
