import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'
import DropdownTopbarClient from './DropdownTopbarClient'
import LandingDrawer from './LandingDrawer'

export default async function LandingTopbar() {
  const payload = await getPayload({ config: configPromise })

  const topbarData = await payload.findGlobal({
    slug: 'topbar',
    depth: 2,
  })

  const topbarLogo = topbarData.logo as Media

  return (
    <div className="glassmorphism justify-between flex items-center rounded-full w-full px-5 py-3">
      <Image
        src={topbarLogo.url ?? '/api/media/file/not-found.png'}
        alt="topbar-logo"
        width={250}
        height={65}
        className="md:block hidden"
      />

      <Image
        src={'/api/media/file/logo-unhas.png'}
        alt="topbar-logo"
        width={30}
        height={30}
        className="block md:hidden"
      />

      <div className="md:hidden block">
        <LandingDrawer navItems={topbarData.navItems} />
      </div>

      <div className="md:flex hidden gap-5">
        {topbarData.navItems?.map((nav) => {
          if (nav.tautan.type === 'dropdown') {
            return (
              <DropdownTopbarClient
                key={nav.id}
                label={nav.tautan.label}
                dropdownItems={nav.tautan.dropdownItems}
              />
            )
          }

          if (nav.tautan.externalUrl) {
            return (
              <Link key={nav.id} href={nav.tautan.externalUrl} className="text-white font-semibold">
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
    </div>
  )
}
