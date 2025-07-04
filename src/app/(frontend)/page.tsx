import React from 'react'

import './globals.css'
import './styles.css'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import HeroSection from '../_components/sections/hero'
import { VisiMisiTujuanSection } from '../_components/sections/visi-misi-tujuan'
import KemitraanSejarahSection from '../_components/sections/kemitraan-sejarah'
import { KetuaProgramStudi, Media } from '@/payload-types'
import { PimpinanSection } from '../_components/sections/pimpinan'
import BeritaSection from '../_components/sections/berita'
import {
  LayananMahasiswa,
  LayananMahasiswaSection,
} from '../_components/sections/layanan-mahasiswa'
import { LandingFooter } from '@/collections/global/Footer/LandingFooter'
import SambutanKaprodiDekstop from '../_components/sections/sambutan-kaprodi-dekstop'
import SambutanKaprodiMobile from '../_components/sections/sambutan-kaprodi-mobile'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const homePage = await payload.findGlobal({
    slug: 'landing-page',
    depth: 2,
  })

  const visiMisiTujuanData = {
    visi: homePage.visi,
    misi: homePage.misi,
    tujuan: homePage.tujuan,
  }

  const kemitraanSection = homePage.kemitraan_section as Media
  const kemitraanUrl = kemitraanSection.url ?? '/api/media_berita/file/not-found-berita-img.png'

  const pimpinanData = homePage.daftar_pimpinan
  const rawLayananMahasiswaData = homePage.layanan_mahasiswa_section

  const sambutanKaprodiRaw = homePage.daftar_sambutan_ketua_prodi

  const sambutanKaprodiData = sambutanKaprodiRaw?.map((temp) => {
    const sambutan = temp.sambutan_ketua_prodi as KetuaProgramStudi

    const { slug, name, image, program_studi, sambutan_singkat } = sambutan

    const gambar = image as Media

    return {
      slug: slug as string,
      name,
      image: gambar,
      program_studi,
      sambutan_singkat,
    }
  })

  // Filter dan map data untuk mendapatkan array LayananMahasiswa yang bersih
  const layananMahasiswaData: LayananMahasiswa[] | null | undefined = rawLayananMahasiswaData
    ?.map((item: any) => {
      // Gunakan 'any' sementara jika struktur persis tidak diketahui
      // Periksa apakah item.layanan_mahasiswa adalah objek dan bukan number
      if (typeof item === 'object' && item !== null && 'layanan_mahasiswa' in item) {
        // Asumsi struktur data: item = { layanan_mahasiswa: LayananMahasiswaObj }
        const actualLayanan = item.layanan_mahasiswa
        if (
          typeof actualLayanan === 'object' &&
          actualLayanan !== null &&
          'judul' in actualLayanan
        ) {
          return actualLayanan as LayananMahasiswa
        }
      } else if (typeof item === 'object' && item !== null && 'judul' in item) {
        // Asumsi struktur data: item = LayananMahasiswaObj secara langsung (jika bukan array relasi terbungkus)
        return item as LayananMahasiswa
      }
      return null
    })
    .filter((item: LayananMahasiswa | null): item is LayananMahasiswa => item !== null)

  return (
    <div className="">
      <HeroSection data={homePage.hero_section} />

      <div id="landing_page_content" className="px-5 md:px-[96px]">
        <div id="sambutan-ketua-program-studi">
          <div className="md:block hidden">
            <SambutanKaprodiDekstop data={sambutanKaprodiData} />
          </div>

          <div className="md:hidden block">
            <SambutanKaprodiMobile data={sambutanKaprodiData} />
          </div>
        </div>

        <VisiMisiTujuanSection data={visiMisiTujuanData} />

        <PimpinanSection data={pimpinanData} />

        <KemitraanSejarahSection sejarahText={homePage.sejarah} kemitraanImg={kemitraanUrl} />

        <BeritaSection />

        <LayananMahasiswaSection data={layananMahasiswaData} />
      </div>

      <LandingFooter />
    </div>
  )
}
