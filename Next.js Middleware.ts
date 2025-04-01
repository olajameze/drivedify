import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_EXTERNAL_LANDING === 'true') {
      window.location.href = process.env.NEXT_PUBLIC_LANDING_PAGE_URL as string
    }
  }, [])

  return null
}