import type { CollectionConfig } from 'payload'

export const MediaBerita: CollectionConfig = {
  slug: 'media_berita',
  access: {
    read: () => true,
  },
  labels: {
    plural: 'Media Berita',
    singular: 'Media Berita',
  },
  admin: {
    description: 'Koleksi khusus untuk gambar dan video yang terkait dengan berita.',
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Teks Alternatif (Deskripsi Gambar)',
      admin: {
        description: 'Teks deskriptif untuk gambar, penting untuk SEO dan aksesibilitas.',
      },
    },
    {
      name: 'caption', // Bidang opsional untuk keterangan gambar
      type: 'text',
      label: 'Keterangan Gambar',
      admin: {
        description: 'Teks pendek yang ditampilkan di bawah gambar (opsional).',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Gambar Utama Artikel', value: 'main-image' },
        { label: 'Gambar Thumbnail', value: 'thumbnail' },
        { label: 'Gambar Inline (dalam artikel)', value: 'inline-image' },
        { label: 'Video Berita', value: 'news-video' },
        { label: 'Lainnya', value: 'other' },
      ],
      defaultValue: 'inline-image',
      admin: {
        description: 'Jenis penggunaan media dalam artikel berita.',
      },
    },
  ],
}
