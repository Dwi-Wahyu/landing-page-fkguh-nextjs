import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const StudentGuide: GlobalConfig = {
  slug: 'student_guide',
  label: 'Student Guide',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  admin: {
    description:
      'Dokumen resmi yang berisi informasi penting bagi mahasiswa, seperti tata tertib, alur akademik, dan layanan fakultas.',
  },
  fields: [
    {
      type: 'upload',
      name: 'file',
      label: 'File Dokumen',
      relationTo: 'media',
    },
  ],
}
