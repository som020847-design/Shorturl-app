'use client'

import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Link2 } from 'lucide-react'

export default function Hero() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="relative z-10">
      {/* Marquee banner */}
      <div className="marquee-wrapper py-2">
        <div className="marquee-track">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} className="pixel-font text-white mx-6" style={{ fontSize: '0.55rem' }}>
              ✦ SHORTEN YOUR URL ✦ GENERATE QR CODE ✦ TRACK CLICKS ✦ ANALYTICS
            </span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="max-w-3xl mx-auto px-6 flex items-center justify-between py-6">
        <div className="flex items-center gap-3 animate-fade-up">
          <div
            className="w-9 h-9 flex items-center justify-center btn-gold"
            style={{ borderRadius: '0px' }}
          >
            <Link2 size={16} className="text-white" />
          </div>
          <span className="pixel-font text-[#111]" style={{ fontSize: '0.75rem' }}>
            BREVIO
          </span>
        </div>

        <div className="animate-fade-up-delay-1">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-xs hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-gold px-5 py-3 text-white">
                LOGIN
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-6 text-center py-12">
        <div className="animate-fade-up-delay-1 mb-6">
          <span
            className="inline-block px-4 py-2 text-white"
            style={{
              background: '#ff69b4',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
            }}
          >
            ✦ URL SHORTENER
          </span>
        </div>

        <h1
          className="animate-fade-up-delay-2 mb-4 pixel-font"
          style={{ fontSize: 'clamp(1.4rem, 5vw, 2.8rem)', lineHeight: 1.4, color: '#111' }}
        >
          MAKE YOUR
          <br />
          <span style={{ color: 'var(--accent)' }}>LINKS</span> SHORT
        </h1>

        <p
          className="animate-fade-up-delay-3 mb-8"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: '420px',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}
        >
          Turn long URLs into short, memorable links.
          Generate QR codes and track your analytics.
        </p>

        {/* Stats row */}
        <div className="animate-fade-up-delay-4 flex justify-center gap-6 mb-10">
          {[
            { num: '∞', label: 'LINKS' },
            { num: 'FREE', label: 'FOREVER' },
            { num: 'QR', label: 'INCLUDED' },
          ].map((s, i) => (
            <div
              key={i}
              className="px-5 py-3 text-center"
              style={{ border: '2px solid #111', boxShadow: '3px 3px 0 #111' }}
            >
              <p className="pixel-font" style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>
                {s.num}
              </p>
              <p className="pixel-font mt-1" style={{ fontSize: '0.45rem', color: '#111' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-fade-up-delay-4 divider-gold max-w-xs mx-auto" />
      </div>
    </header>
  )
}