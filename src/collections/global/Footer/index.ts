import { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { tautan } from '@/fields/tautan'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'infos',
          label: 'Info',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'alamat',
              label: 'Alamat',
              type: 'textarea',
              required: true,
            },
            {
              name: 'kontak',
              label: 'Kontak',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Navigasi 1',
          name: 'navigasi_1',
          fields: [
            {
              name: 'title',
              label: 'Judul',
              type: 'text',
            },
            {
              name: 'navItems',
              type: 'array',
              fields: [tautan()],
            },
          ],
        },
        {
          label: 'Navigasi 2',
          name: 'navigasi_2',
          fields: [
            {
              name: 'title',
              label: 'Judul',
              type: 'text',
            },
            {
              name: 'navItems',
              type: 'array',
              fields: [tautan()],
            },
          ],
        },
        {
          label: 'Navigasi 3',
          name: 'navigasi_3',
          fields: [
            {
              name: 'title',
              label: 'Judul',
              type: 'text',
            },
            {
              name: 'navItems',
              type: 'array',
              fields: [tautan()],
            },
          ],
        },
      ],
    },
  ],
}
