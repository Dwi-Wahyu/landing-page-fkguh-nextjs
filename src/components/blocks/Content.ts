import { defaultLexical } from '@/fields/defaultLexical'

import { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  imageURL: '/api/media/file/content-preview.png',
  fields: [
    {
      name: 'body',
      type: 'richText',
      editor: defaultLexical,
    },
  ],
}
