import { Block } from 'payload'

export const SambutanKaprodiCard: Block = {
  slug: 'ketua_program_studi_card',
  imageURL: '/api/media/file/sambutan-kaprodi-card-preview.png',
  labels: {
    plural: 'Sambutan Kaprodi Card',
    singular: 'Sambutan Kaprodi Card',
  },
  fields: [
    {
      name: 'ketua_program_studi_card',
      type: 'relationship',
      relationTo: 'ketua_program_studi',
    },
  ],
}

export const SambutanKaprodiSection: Block = {
  slug: 'sambutan_kaprodi_section',
  imageURL: '/api/media/file/sambutan-kaprodi-section-preview.png',
  labels: {
    plural: 'Sambutan Kaprodi Section',
    singular: 'Sambutan Kaprodi Section',
  },
  fields: [
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [SambutanKaprodiCard],
    },
  ],
}
