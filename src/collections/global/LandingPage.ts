import { anyone } from '@/access/anyone'
import { authenticatedAdmin } from '@/access/authenticatedAdmin'
import { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page Settings',
  access: {
    read: anyone,
    update: authenticatedAdmin,
  },
  fields: [
    {
      name: 'hero_section',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'video_profil_fakultas',
          type: 'upload',
          label: 'Video Profil Fakultas',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'main_heading',
          type: 'text',
          label: 'Judul Utama Hero',
          required: true,
        },
      ],
    },
    {
      name: 'visi',
      type: 'textarea',
      label: 'Visi Fakultas',
      admin: {
        description: 'Masukkan pernyataan visi fakultas yang komprehensif dan inspiratif.', // Deskripsi untuk visi
      },
      required: true,
    },
    {
      name: 'misi',
      type: 'textarea',
      label: 'Misi Fakultas',
      admin: {
        description:
          'Cantumkan misi-misi utama yang menguraikan tujuan inti dan bagaimana fakultas mencapai visinya.', // Deskripsi untuk misi
      },
      required: true,
    },
    {
      name: 'tujuan',
      type: 'textarea',
      label: 'Tujuan Fakultas',
      admin: {
        description:
          'Jelaskan secara spesifik hasil atau capaian yang diharapkan dari kegiatan fakultas untuk mewujudkan misi dan visinya.', // Deskripsi untuk tujuan
      },
      required: true,
    },
    {
      name: 'info',
      type: 'group',
      label: 'Informasi Statistik Fakultas',
      fields: [
        {
          name: 'departemen',
          label: 'Jumlah Departemen',
          type: 'number',
          admin: {
            description: 'Masukkan total jumlah departemen yang ada di fakultas.',
          },
        },
        {
          name: 'program_studi',
          label: 'Jumlah Program Studi',
          type: 'number',
          admin: {
            description: 'Masukkan total jumlah program studi (Prodi) di bawah fakultas ini.',
          },
        },
        {
          name: 'staff',
          label: 'Jumlah Staf Pengajar & Kependidikan',
          type: 'number',
          admin: {
            description: 'Masukkan total jumlah staf, termasuk dosen dan tenaga kependidikan.',
          },
        },
        {
          name: 'mahasiswa',
          label: 'Jumlah Mahasiswa',
          type: 'number',
          admin: {
            description: 'Masukkan total jumlah mahasiswa.',
          },
        },
      ],
    },
    {
      name: 'kemitraan_section',
      type: 'upload', // 'upload' untuk satu gambar
      relationTo: 'media',
      label: 'Gambar Kemitraan Internasional',
      admin: {
        description:
          'Unggah gambar atau logo yang merepresentasikan kemitraan dan kolaborasi internasional fakultas.',
      },
      required: true,
    },
    {
      name: 'sejarah',
      type: 'textarea',
      label: 'Sejarah Singkat',
      required: true,
    },
    {
      name: 'daftar_sambutan_ketua_prodi', // Nama field untuk daftar ini
      label: 'Daftar Sambutan Ketua Program Studi',
      type: 'array',
      labels: {
        singular: 'Sambutan Ketua Prodi',
        plural: 'Sambutan Ketua Prodi',
      },
      fields: [
        {
          name: 'sambutan_ketua_prodi', // Nama field untuk setiap item di dalam array
          type: 'relationship',
          label: 'Ketua Program Studi',
          relationTo: 'ketua_program_studi', // Mereferensikan Collection KetuaProgramStudi Anda
          required: true,
          admin: {
            description: 'Pilih Ketua Program Studi yang akan ditampilkan sambutannya.',
          },
        },
      ],
      admin: {
        description:
          'Kelola daftar sambutan Ketua Program Studi yang akan muncul di halaman landing.',
      },
    },
    {
      name: 'daftar_pimpinan', // Mengubah nama array utama menjadi 'daftar_pimpinan'
      label: 'Daftar Pimpinan yang Ditampilkan',
      type: 'array',
      labels: {
        singular: 'Pimpinan', // Label untuk satu entri di UI admin (misal: "Tambah Pimpinan")
        plural: 'Pimpinan', // Label untuk daftar entri di UI admin
      },
      fields: [
        {
          name: 'pimpinan', // Mengubah nama field di dalam item array menjadi 'pimpinan'
          type: 'relationship',
          relationTo: 'pimpinan',
          required: true,
          admin: {
            description: 'Pilih pimpinan yang akan ditampilkan di bagian ini.',
          },
        },
      ],
      admin: {
        description: 'Pilih pimpinan yang akan muncul di bagian "Pimpinan" di halaman depan.',
      },
    },
    {
      name: 'layanan_mahasiswa_section',
      label: 'Daftar Layanan Mahasiswa',
      type: 'array',
      labels: {
        singular: 'Layanan',
        plural: 'Layanan',
      },
      fields: [
        {
          name: 'layanan_mahasiswa',
          label: 'Layanan Mahasiswa',
          type: 'relationship',
          relationTo: 'layanan_mahasiswa',
          required: true,
          admin: {
            description: 'Pilih layanan atau aktivitas mahasiswa yang akan ditampilkan.',
          },
        },
      ],
      admin: {
        description:
          'Kelola daftar layanan/aktivitas mahasiswa yang akan muncul di halaman landing.',
      },
    },
  ],
}
