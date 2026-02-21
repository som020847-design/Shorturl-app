'use client'

import { useState } from 'react'
import { useUser, SignInButton } from '@clerk/nextjs'
import { Scissors, Copy, ExternalLink, Lock, Loader2, QrCode } from 'lucide-react'
import toast from 'react-hot-toast'
import QRCode from 'qrcode'
import Image from 'next/image'

interface ShortenResult {
  shortUrl: string
  slug: string
  qrCode: string
}

export default function ShortenForm({ onSuccess }: { onSuccess: () => void }) {
  const { isSignedIn } = useUser()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ShortenResult | null>(null)

  const handleShorten = async () => {
    if (!url.trim()) return toast.error('กรุณากรอก URL ก่อนนะคะ')

    let processedUrl = url.trim()
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = 'https://' + processedUrl
    }

    try { new URL(processedUrl) }
    catch { return toast.error('URL ไม่ถูกต้อง') }

    setLoading(true)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: processedUrl }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'เกิดข้อผิดพลาด')
      }

      const data = await res.json()
      const shortUrl = `${window.location.origin}/r/${data.slug}`

      const qrCode = await QRCode.toDataURL(shortUrl, {
        width: 300,
        margin: 2,
        color: { dark: '#c9a84c', light: '#070709' },
      })

      setResult({ shortUrl, slug: data.slug, qrCode })
      onSuccess()
      toast.success('สร้าง Short URL สำเร็จ! ✨')
    } catch (err: any) {
      toast.error(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('คัดลอกแล้ว!')
  }

  const downloadQR = () => {
    if (!result) return
    const a = document.createElement('a')
    a.href = result.qrCode
    a.download = `qr-${result.slug}.png`
    a.click()
    toast.success('ดาวน์โหลด QR Code แล้ว!')
  }

  return (
    <div className="animate-fade-up-delay-4">
      <div className="glass-card rounded-2xl p-6 mb-6">
        <label className="block text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3 tag-mono">
          ✦ กรอก URL ที่ต้องการย่อ
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && isSignedIn && handleShorten()}
            placeholder="https://your-very-long-url.com/path/to/page"
            className="input-gold flex-1 px-4 py-3.5 rounded-xl text-sm w-full"
          />

          {isSignedIn ? (
            <button
              onClick={handleShorten}
              disabled={loading}
              className="btn-gold px-6 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 whitespace-nowrap disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Scissors size={16} />}
              {loading ? 'กำลังสร้าง...' : 'ย่อ URL'}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="btn-gold px-6 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2 whitespace-nowrap">
                <Lock size={14} />
                เข้าสู่ระบบ
              </button>
            </SignInButton>
          )}
        </div>
      </div>

      {result && isSignedIn && (
        <div className="glass-card rounded-2xl p-6 animate-fade-up">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4 tag-mono">
                ✦ Short URL ของคุณ
              </p>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(201,168,76,0.05)] border border-[var(--border)] mb-3 hover:bg-[rgba(201,168,76,0.1)] transition">
                
                {/* 🔥 เปลี่ยนจาก span เป็น a */}
                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-[var(--gold)] tag-mono text-sm truncate hover:underline"
                >
                  {result.shortUrl}
                </a>

                <button
                  onClick={() => copyToClipboard(result.shortUrl)}
                  className="p-2 hover:text-[var(--gold)] text-[var(--text-secondary)] transition-colors rounded-lg hover:bg-[rgba(201,168,76,0.1)]"
                >
                  <Copy size={15} />
                </button>

                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-[var(--gold)] text-[var(--text-secondary)] transition-colors rounded-lg hover:bg-[rgba(201,168,76,0.1)]"
                >
                  <ExternalLink size={15} />
                </a>
              </div>

              <div className="divider-gold my-4" />
              <p className="text-xs text-[var(--text-secondary)] tag-mono mb-1">URL ต้นฉบับ:</p>
              <p className="text-xs text-[var(--text-secondary)] truncate opacity-60">{url}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-4 tag-mono self-start">
                ✦ QR Code
              </p>

              <div className="p-4 rounded-xl bg-[#070709] border border-[var(--border)] float-animation">
                <Image
                  src={result.qrCode}
                  alt="QR Code"
                  width={160}
                  height={160}
                  className="rounded-lg"
                />
              </div>

              <button
                onClick={downloadQR}
                className="mt-3 flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors tag-mono"
              >
                <QrCode size={12} />
                ดาวน์โหลด QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}