import { CollectionConfig } from 'payload'

export const MediaBankSoal: CollectionConfig = {
  slug: 'media_bank_soal', // Slug unik untuk koleksi media ini
  access: {
    read: () => true, // Memungkinkan siapa saja untuk membaca (mengakses) file media ini
  },
  labels: {
    plural: 'Media Bank Soal',
    singular: 'Media Bank Soal',
  },
  admin: {
    description:
      'Koleksi khusus untuk dokumen file soal (PDF, DOCX) dan media pendukung bank soal.',
  },
  upload: {
    mimeTypes: [
      'application/pdf', // Izinkan file PDF
      'application/msword', // Izinkan file .doc (Word 97-2003)
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Izinkan file .docx (Word 2007+)
      'application/vnd.ms-excel', // Opsional: jika ada soal dalam format Excel
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Opsional: jika ada soal dalam format Excel
      'image/jpeg',
      'image/png',
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Teks Alternatif (Deskripsi File)',
      admin: {
        description:
          'Teks deskriptif untuk file (misalnya, "Soal Ujian Matematika Bab Aljabar"). Penting untuk aksesibilitas.',
      },
    },
    {
      name: 'keterangan', // Menggunakan 'keterangan' alih-alih 'caption' agar lebih sesuai untuk dokumen
      type: 'textarea', // Menggunakan textarea karena deskripsi dokumen bisa lebih panjang
      label: 'Keterangan File',
      admin: {
        description: 'Informasi tambahan atau keterangan singkat mengenai isi file ini (opsional).',
      },
    },
  ],
}
