import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import { revalidateDelete } from './hooks/revalidatePost'
import { populateAuthors } from './hooks/populateAuthors'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Berita: CollectionConfig = {
  slug: 'berita',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  labels: {
    singular: 'Berita',
    plural: 'Berita',
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Berita',
      type: 'text',
      required: true,
    },
    {
      name: 'short_description',
      label: 'Deskripsi Singkat',
      type: 'textarea',
    },
    {
      name: 'image',
      label: 'Gambar',
      type: 'upload',
      relationTo: 'media_berita',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            UploadFeature({
              collections: {
                media_berita: {
                  fields: [
                    {
                      name: 'caption',
                      type: 'text',
                      label: 'Keterangan Gambar',
                    },
                    {
                      name: 'altText', // Sangat disarankan untuk aksesibilitas dan SEO
                      type: 'text',
                      label: 'Teks Alternatif (Alt Text)',
                      required: true,
                    },
                    // Anda juga bisa menambahkan field kustom lainnya jika diperlukan
                    // misalnya, 'alignment', 'width', dll.
                  ],
                },
              },
            }),
          ]
        },
      }),
      label: false,
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Tanggal',
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Penulis',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'Nama',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
}
