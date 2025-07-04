import { GlobalConfig } from 'payload'

export const VideoProfil: GlobalConfig = {
  slug: 'video_profil',
  label: 'Video Profil',
  admin: {
    description:
      'Video pengenalan institusi atau program studi yang menampilkan visi, misi, fasilitas, dan kegiatan akademik maupun non-akademik.',
  },
  fields: [
    {
      type: 'upload',
      name: 'video',
      label: 'Video Profil',
      relationTo: 'media',
      required: true,
    },
  ],
}
