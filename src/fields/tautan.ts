import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'
import { GroupField } from 'payload'

export const tautan = (overrides: Partial<GroupField> = {}): Field => {
  return deepMerge(
    {
      name: 'tautan',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              label: 'Tipe Tautan',
              required: true,
              defaultValue: 'internal',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
                { label: 'Dropdown', value: 'dropdown' },
              ],
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Buka di tab baru',
              admin: {
                width: '50%',
                style: {
                  alignSelf: 'flex-end',
                },
              },
            },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'internalPath',
          type: 'text',
          label: 'Internal Path',
          admin: {
            placeholder: '/berita',
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
          required: true,
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            placeholder: 'https://example.com',
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
          required: true,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'linkType',
              type: 'radio',
              label: 'Tipe Tautan',
              options: [
                { label: 'Internal', value: 'internal' },
                { label: 'External', value: 'external' },
              ],
              defaultValue: 'internal',
              dbName: 'li_type',
              admin: {
                layout: 'horizontal',
              },
              required: true,
            },
            {
              name: 'internalPath',
              type: 'text',
              label: 'Internal Path',
              admin: {
                placeholder: '/layanan-mahasiswa',
                condition: (_, siblingData) => siblingData?.linkType === 'internal',
              },
              required: true,
            },
            {
              name: 'externalUrl',
              type: 'text',
              label: 'External URL',
              admin: {
                placeholder: 'https://example.com',
                condition: (_, siblingData) => siblingData?.linkType === 'external',
              },
              required: true,
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Buka di tab baru',
            },
          ],
        },
      ],
    },
    overrides,
  )
}
