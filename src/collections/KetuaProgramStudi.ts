import { daftarProdi } from '@/data/program-studi'
import { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const KetuaProgramStudi: CollectionConfig = {
  slug: 'ketua_program_studi',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Ketua Program Studi',
    plural: 'Ketua Program Studi',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Nama ',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Gambar',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'select',
      name: 'program_studi',
      label: 'Program Studi',
      required: true,
      options: daftarProdi.map((prodi) => ({
        label: prodi,
        value: prodi,
      })),
    },
    {
      type: 'textarea',
      name: 'sambutan_singkat',
      label: 'Sambutan Singkat',
      required: true,
    },
    {
      type: 'richText',
      name: 'sambutan',
      label: 'Kata Sambutan',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      required: true,
    },
    ...slugField('name'),
  ],
}
