import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Survey: CollectionConfig = {
  slug: 'survey',
  labels: {
    singular: 'Survey',
    plural: 'Survey',
  },
  fields: [
    {
      name: 'judul',
      label: 'Judul',
      type: 'text',
      required: true,
      admin: {
        description: 'Judul dari survei.',
      },
    },
    {
      name: 'link',
      label: 'Link Survey',
      type: 'text',
      required: true,
      admin: {
        description: 'Tautan URL menuju halaman survei eksternal atau internal.',
      },
    },
    ...slugField('judul'),
  ],
}
