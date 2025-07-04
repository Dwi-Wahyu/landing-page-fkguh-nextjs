import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticatedAdmin: isAuthenticated = ({ req: { user } }) => {
  if (user?.Role === 'Admin') {
    return true
  }
  return false
}
