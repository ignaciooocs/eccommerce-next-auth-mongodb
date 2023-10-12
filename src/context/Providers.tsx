'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const queryClient = new QueryClient()

export function AuthProvider ({ children }: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}