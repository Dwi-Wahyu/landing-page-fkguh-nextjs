// app/components/landing-drawer.tsx (atau lokasi yang sesuai)
'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react' // atau gunakan icon sendiri
import { Topbar } from '@/payload-types'
import CollapsibleDrawerClient from './CollapsibleDrawerClient'

type TopbarNavItems = Topbar['navItems']

interface LandingDrawerProps {
  navItems: TopbarNavItems
}

export default function LandingDrawer({ navItems }: LandingDrawerProps) {
  return (
    <Drawer key={navItems?.length}>
      <DrawerTrigger asChild>
        <button className="p-2">
          <MenuIcon className="h-6 w-6 text-white" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="glassmorphism">
        <DrawerHeader className="flex mb-3 justify-center w-full">
          <DrawerTitle className="sr-only">Menu Navigasi</DrawerTitle>
        </DrawerHeader>

        {navItems && (
          <div className="flex flex-col items-center text-primary-foreground pb-10 gap-5">
            {navItems.map((nav) => {
              if (nav.tautan.dropdownItems?.length) {
                return (
                  <CollapsibleDrawerClient
                    key={nav.id}
                    collapsibleItems={nav.tautan.dropdownItems}
                    label={nav.tautan.label}
                  />
                )
              }

              if (nav.tautan.externalUrl) {
                return (
                  <Link
                    key={nav.id}
                    href={nav.tautan.externalUrl}
                    className="text-white font-semibold"
                  >
                    {nav.tautan.label}
                  </Link>
                )
              }

              if (nav.tautan.internalPath) {
                return (
                  <Link
                    key={nav.id}
                    href={nav.tautan.internalPath}
                    className="text-white font-semibold"
                  >
                    {nav.tautan.label}
                  </Link>
                )
              }
            })}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
