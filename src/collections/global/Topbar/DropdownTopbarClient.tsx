'use client' // WAJIB ada ini untuk menandakan ini Client Component

import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu' // Pastikan path ini benar
import { ChevronDown } from 'lucide-react'
import Link from 'next/link' // Mungkin dibutuhkan jika dropdown item adalah Link

type DropdownItem = {
  id?: string | null | undefined
  label: string
  internalPath?: string | null | undefined
  externalUrl?: string | null | undefined
}

interface DropdownMenuClientProps {
  label: string
  dropdownItems: DropdownItem[] | null | undefined
}

export default function DropdownTopbarClient({ label, dropdownItems }: DropdownMenuClientProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <DropdownMenu onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="flex items-center cursor-pointer gap-1 focus:outline-none data-[state=open]:outline-none">
        <h1 className="text-white font-semibold">{label}</h1>
        <ChevronDown
          className={`text-white w-5 h-5 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-md shadow-lg p-2 min-w-[180px] z-50">
        {dropdownItems?.map((subnav) => (
          <DropdownMenuItem
            key={subnav.id}
            className="cursor-pointer px-3 py-2 rounded-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150 focus:bg-blue-100 focus:text-blue-700"
            asChild // Penting jika DropdownMenuItem membungkus Link
          >
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
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
