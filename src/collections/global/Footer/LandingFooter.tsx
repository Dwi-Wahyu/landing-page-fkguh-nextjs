import Image from 'next/image'
import Link from 'next/link'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'

export const LandingFooter = async () => {
  const payload = await getPayload({ config: configPromise })

  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  const { infos, navigasi_1, navigasi_2, navigasi_3 } = footerData

  const { logo } = footerData.infos

  const footerLogo = logo as Media

  const renderNav = (nav: any) => {
    if (!nav?.navItems?.length) return null

    return (
      <div className="md:ml-6">
        <h4 className="text-white text-lg font-semibold mb-4">{nav.title}</h4>
        <ul className="space-y-2 text-sm">
          {nav.navItems.map((item: any) => {
            const link = item.tautan
            const target = link?.newTab ? '_blank' : '_self'
            const rel = link?.newTab ? 'noopener noreferrer' : undefined

            if (link?.type === 'dropdown') {
              return (
                <li key={item.id}>
                  <span className="font-semibold">{link.label}</span>
                  <ul className="ml-4 space-y-1">
                    {link.dropdownItems?.map((child: any, idx: number) => {
                      const childHref =
                        child.linkType === 'internal' ? child.internalPath : child.externalUrl
                      return (
                        <li key={idx}>
                          <Link
                            href={childHref}
                            target={child.newTab ? '_blank' : '_self'}
                            rel={child.newTab ? 'noopener noreferrer' : undefined}
                            className="hover:text-white transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            }

            const href = link?.type === 'internal' ? link.internalPath : (link?.externalUrl ?? '#')

            return (
              <li key={item.id}>
                <Link
                  href={href}
                  target={target}
                  rel={rel}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <footer className="bg-[#0F0F0F] text-gray-300 py-10 px-8 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3 mb-2">
            {footerLogo && (
              <Image
                src={footerLogo.url ?? '/api/media/file/not-found.png'}
                alt={footerLogo.alt || 'Logo'}
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            )}
          </div>
          <p className="text-sm whitespace-pre-line">{infos?.alamat}</p>
          <p className="text-sm font-semibold mt-2">{infos?.kontak}</p>
        </div>

        {renderNav(navigasi_1)}
        {renderNav(navigasi_2)}
        {renderNav(navigasi_3)}
      </div>
    </footer>
  )
}
