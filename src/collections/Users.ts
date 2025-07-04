import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  auth: true,
  fields: [
    {
      type: 'text',
      name: 'Nama',
    },

    {
      type: 'select',
      name: 'Role',
      options: ['Admin', 'Penulis'],
      defaultValue: 'Admin',
    },
  ],
}
