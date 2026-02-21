'use client'

import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import { Link2, Zap } from 'lucide-react'

export default function Hero() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="relative z-10 pt-8 pb-16">
      <nav className="max-w-4xl mx-auto px-4 flex items-center justify-between mb-20">
        <div className="flex items-center gap-2 animate-fade-up">
          <div className="w-8 h-8 rounded-lg btn-gold flex items-center justify-center">
            <Link2 size={14} className="text-amber-900" />
          </div>
          <span className="font-semibold tracking-[0.2em] text-sm uppercase text-[var(--gold)]"
            style={{ fontFamily: 'Outfit, sans-serif' }}>
            BREVIO
          </span>
        </div>

        <div className="animate-fade-up-delay-1">
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--text-secondary)] hidden sm:block"
                style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>
                {user?.emailAddresses[0]?.emailAddress}
              </span>
              <div className="glass-card p-0.5 rounded-full">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-gold px-5 py-2 rounded-full text-sm font-medium tracking-wide">
                เข้าสู่ระบบ
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="animate-fade-up-delay-1 mb-4">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase
            text-[var(--text-secondary)] glass-card px-4 py-2 rounded-full tag-mono">
            <Zap size={10} className="text-[var(--gold)]" />
            Smart URL Shortener
          </span>
        </div>

        <h1 className="animate-fade-up-delay-2 mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <span className="text-[var(--text-primary)]">ย่อ </span>
          <span className="shimmer-text italic">URL</span>
          <br />
          <span className="text-[var(--text-primary)]">ให้กระชับ</span>
          <span className="text-[var(--text-secondary)]"> สวยงาม</span>
        </h1>

        <p className="animate-fade-up-delay-3 text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
          style={{ fontSize: '1rem', fontWeight: 300 }}>
          แปลง URL ยาวๆ ให้กลายเป็น Short Link ที่จดจำง่าย
          พร้อม QR Code และ Analytics โดยละเอียด
        </p>

        <div className="animate-fade-up-delay-4 mt-10 flex items-center gap-4 max-w-xs mx-auto">
          <div className="flex-1 divider-gold" />
          <span className="text-[var(--gold)] opacity-50" style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}>✦</span>
          <div className="flex-1 divider-gold" />
        </div>
      </div>
    </header>
  )
}