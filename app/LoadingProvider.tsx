'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    window.addEventListener('routeChangeStart', handleStart)
    window.addEventListener('routeChangeComplete', handleComplete)
    window.addEventListener('routeChangeError', handleComplete)

    return () => {
      window.removeEventListener('routeChangeStart', handleStart)
      window.removeEventListener('routeChangeComplete', handleComplete)
      window.removeEventListener('routeChangeError', handleComplete)
    }
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {children}
    </>
  )
}

