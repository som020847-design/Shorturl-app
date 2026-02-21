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
    <main className="relative min-h-screen overflow-x-hidden">

      {/* HERO SECTION (เต็มตาม Hero component) */}
      <section>
        <Hero />
      </section>

      {/* CONTENT WRAPPER — กึ่งกลาง ไม่เต็มจอ */}
      <section className="w-full max-w-[720px] mx-auto px-5 sm:px-8 pb-32">

        <ShortenForm onSuccess={handleNewUrl} />

        {isSignedIn && (
          <div className="mt-10">
            <UrlHistory key={refreshKey} />
          </div>
        )}

      </section>

    </main>
  )
}