import Image from 'next/image'

export default async function BeritaLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className="relative">
      {/* Container untuk Background Image dan Gradient Overlay */}
      {/* Ini perlu 'relative' karena gambar dan gradient akan 'absolute' di dalamnya */}
      <div className="relative w-full h-screen">
        {/* Gambar Background */}
        <Image
          src="/api/media/file/hero-background-thumbnail.jpg"
          fill
          alt="hero-background-thumbnail"
          className="object-cover z-0" // Pastikan gambar menutupi area dan berada di bawah (z-0)
        />

        {/* Gradient Overlay */}
        {/* Pastikan ini 'absolute inset-0' untuk menutupi seluruh parent */}
        {/* dan 'z-10' untuk berada di atas gambar */}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        {/* Catatan: 'from-background' mungkin perlu didefinisikan di tailwind.config.js Anda,
            atau ganti dengan warna Tailwind standar seperti 'from-black' atau 'from-blue-900'
            sesuai keinginan Anda untuk efek gradient.
            Saya menggunakan 'from-black' sebagai contoh umum untuk efek gelap di bagian bawah.
         */}
      </div>

      {/* Konten Halaman (children) */}
      {/* Ini perlu 'absolute' agar bisa "melayang" di atas background dan berada di paling depan (z-20) */}
      <div className="absolute top-0 left-0 pt-20 z-20 w-full h-full">{children}</div>
    </div>
  )
}
