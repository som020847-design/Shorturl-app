'use client'

import { useUser } from '@clerk/nextjs'
import Hero from '@/components/Hero'
import ShortenForm from '@/components/ShortenForm'
import UrlHistory from '@/components/UrlHistory'
import { useState } from 'react'

export default function Home() {
  const { isSignedIn } = useUser()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleNewUrl = () => setRefreshKey(k => k + 1)

  return (
    <main className="relative min-h-screen z-10">
      <Hero />
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <ShortenForm onSuccess={handleNewUrl} />
        {isSignedIn && <UrlHistory key={refreshKey} />}
      </div>
    </main>
  )
}