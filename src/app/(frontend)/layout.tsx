import React from 'react'
import './styles.css'
import './globals.css'
import LandingTopbar from '@/collections/global/Topbar/LandingTopbar'

import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div className="absolute p-4 px-5 md:px-[96px] top-0 left-0 z-50 w-full">
          <LandingTopbar />
        </div>
        <main>
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
      </body>
    </html>
  )
}
