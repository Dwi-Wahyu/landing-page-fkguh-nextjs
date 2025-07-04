import { slugField } from '@/fields/slug' // Pastikan path ini benar untuk slugField Anda

// Jika Anda memiliki hook untuk menambahkan penulis (seperti populateAuthors pada contoh Berita)
// import { populateAuthors } from './hooks/populateAuthors'; // Sesuaikan path jika diperlukan

// Asumsi Anda memiliki akses control functions
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const BankSoal: CollectionConfig = {
  slug: 'bank-soal', // Slug koleksi, gunakan hyphen-case
  admin: {
    useAsTitle: 'judul', // Gunakan field 'judul' sebagai judul di admin UI
    defaultColumns: ['judul', 'penulis', 'jumlahDilihat', 'createdAt'], // Kolom default di tabel admin
  },
  access: {
    create: authenticated, // Hanya pengguna terautentikasi yang bisa membuat
    read: anyone, // Siapa saja bisa melihat soal
    update: authenticated, // Hanya pengguna terautentikasi yang bisa memperbarui
    delete: authenticated, // Hanya pengguna terautentikasi yang bisa menghapus
  },
  labels: {
    singular: 'Bank Soal',
    plural: 'Bank Soal',
  },
  fields: [
    {
      name: 'judul',
      label: 'Judul Soal',
      type: 'text',
      required: true,
      unique: true, // Pastikan judul soal unik
      localized: false, // Sesuaikan jika Anda membutuhkan lokalisasi
    },

    {
      name: 'penulis',
      label: 'Penulis Soal',
      type: 'relationship',
      relationTo: 'users', // Merujuk ke koleksi 'users' Anda
      required: true,
      hasMany: false, // Asumsi 1 soal hanya memiliki 1 penulis utama
    },
    {
      name: 'jumlahDilihat',
      label: 'Jumlah Dilihat',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true, // Tidak bisa diedit manual dari admin
        position: 'sidebar', // Posisikan di sidebar admin
      },
    },
    {
      name: 'fileSoal',
      label: 'File Dokumen Soal',
      type: 'upload',
      relationTo: 'media_bank_soal', // Relasi ke koleksi media khusus untuk file soal
      required: true,
      // Jika Anda ingin membatasi jenis file (misal hanya PDF, DOCX), tambahkan validasi di koleksi media
    },
    {
      name: 'publishedAt', // Tanggal publikasi, mirip dengan Berita
      type: 'date',
      required: true,
      label: 'Tanggal Publikasi',
      defaultValue: () => new Date(), // Default ke tanggal saat ini
    },
    ...slugField('judul'),
  ],
}
