// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { defaultLexical } from './fields/defaultLexical'
import { Berita } from './collections/Berita'
import { StudentActivity } from './collections/StudentActivity'
import { Dosen } from './collections/Dosen'
import { Pimpinan } from './collections/Pimpinan'
import { KetuaProgramStudi } from './collections/KetuaProgramStudi'
import { LandingPage } from './collections/global/LandingPage'
import { MediaBerita } from './collections/MediaBerita'
import { LayananMahasiswa } from './collections/LayananMahasiswa'
import { Footer } from './collections/global/Footer'
import { BankSoal } from './collections/BankSoal'
import { MediaBankSoal } from './collections/MediaBankSoal'
import { Topbar } from './collections/global/Topbar'
import { Sejarah } from './collections/Sejarah'
import { Kurikulum } from './collections/Kurikulum'
import { ProfilLulusan } from './collections/ProfilLulusan'
import { StudentGuide } from './collections/StudentGuide'
import { SaranaDanPrasarana } from './collections/SaranaDanPrasarana'
import { VideoProfil } from './collections/VideoProfil'
import { Survey } from './collections/Survey'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Berita,
    MediaBerita,
    Pimpinan,
    KetuaProgramStudi,
    Dosen,
    StudentActivity,
    LayananMahasiswa,
    BankSoal,
    MediaBankSoal,
    Survey,
  ],
  globals: [
    LandingPage,
    Topbar,
    Footer,
    Sejarah,
    Kurikulum,
    ProfilLulusan,
    StudentGuide,
    SaranaDanPrasarana,
    VideoProfil,
  ],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
