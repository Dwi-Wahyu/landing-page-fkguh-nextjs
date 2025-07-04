// components/CollapsibleClient.tsx
'use client' // WAJIB ada ini untuk menandakan ini Client Component

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react' // Pastikan lucide-react terinstal

type CollapsibleItem = {
  id?: string | null | undefined
  label: string
  internalPath?: string | null | undefined
  externalUrl?: string | null | undefined
}

interface CollapsibleClientProps {
  label: string
  defaultOpen?: boolean // Opsional: untuk mengontrol apakah terbuka secara default
  collapsibleItems: CollapsibleItem[] | null | undefined
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'

export default function CollapsibleDrawerClient({
  label,
  defaultOpen = false,
  collapsibleItems,
}: CollapsibleClientProps) {
  const [isOpen] = useState(defaultOpen)

  return (
    <Collapsible key={label}>
      <CollapsibleTrigger className="flex gap-2 items-center justify-center">
        <h1 className="text-center">{label}</h1>
        <ChevronDown
          className={`text-white w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-center justify-center gap-3">
        {collapsibleItems?.map((subnav) => (
          <div key={subnav.id} className="">
            {subnav.internalPath ? (
              <Link href={subnav.internalPath}>{subnav.label}</Link>
            ) : subnav.externalUrl ? (
              <a href={subnav.externalUrl} target="_blank" rel="noopener noreferrer">
                {subnav.label}
              </a>
            ) : (
              // Jika tidak ada link, item tetap clickable
              <div>{subnav.label}</div>
            )}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
