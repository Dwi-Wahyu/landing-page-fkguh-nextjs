import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const StudentActivity: CollectionConfig = {
  slug: 'student_activity',
  labels: {
    singular: 'Student Activity',
    plural: 'Student Activity',
  },
  fields: [
    {
      name: 'title',
      label: 'Judul',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar',
      relationTo: 'media',
      required: true,
    },
    ...slugField(),
  ],
}
