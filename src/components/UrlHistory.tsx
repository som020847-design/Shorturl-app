'use client'

import { useEffect, useState } from 'react'
import { BarChart2, Copy, ExternalLink, Clock, MousePointerClick, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import AnalyticsModal from './AnalyticsModal'

interface UrlRecord {
  id: string
  slug: string
  fullUrl: string
  clicks: number
  createdAt: string
}

export default function UrlHistory() {
  const [urls, setUrls] = useState<UrlRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/urls')
      .then(r => r.json())
      .then(data => { setUrls(data); setLoading(false) })
      .catch(() => { toast.error('โหลดประวัติไม่ได้'); setLoading(false) })
  }, [])

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/r/${slug}`)
    toast.success('คัดลอกแล้ว!')
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('th-TH', {
      day: 'numeric', month: 'short', year: '2-digit',
      hour: '2-digit', minute: '2-digit',
    })

  return (
    <>
      <div className="mt-10 animate-fade-up-delay-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full btn-gold" />
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 400 }}>
              ประวัติการย่อ URL
            </h2>
          </div>
          <span className="tag-mono text-xs text-[var(--text-secondary)] glass-card px-3 py-1 rounded-full">
            {urls.length} รายการ
          </span>
        </div>

        {loading ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--gold)] border-t-transparent animate-spin mx-auto" />
          </div>
        ) : urls.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <p className="text-[var(--text-secondary)] text-sm">ยังไม่มีประวัติการย่อ URL</p>
          </div>
        ) : (
          <div className="space-y-3">
            {urls.map((item, i) => (
              <div key={item.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <span className="tag-mono text-xs text-[var(--text-secondary)] opacity-40 w-5 text-center shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[var(--gold)] tag-mono text-xs font-medium">/r/{item.slug}</span>
                    <span className="text-[var(--text-secondary)] opacity-30">·</span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] opacity-60">
                      <Clock size={10} />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] truncate opacity-70">{item.fullUrl}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 glass-card px-3 py-1.5 rounded-lg">
                  <MousePointerClick size={12} className="text-[var(--gold)]" />
                  <span className="tag-mono text-xs">{item.clicks}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => copyToClipboard(item.slug)}
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors rounded-lg hover:bg-[rgba(201,168,76,0.1)]">
                    <Copy size={13} />
                  </button>
                  <a href={`${window.location.origin}/r/${item.slug}`} target="_blank" rel="noopener noreferrer"
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors rounded-lg hover:bg-[rgba(201,168,76,0.1)]">
                    <ExternalLink size={13} />
                  </a>
                  <button onClick={() => setSelectedId(item.id)}
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors rounded-lg hover:bg-[rgba(201,168,76,0.1)] flex items-center gap-1">
                    <BarChart2 size={13} />
                    <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedId && (
        <AnalyticsModal
          urlId={selectedId}
          urlData={urls.find(u => u.id === selectedId)!}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  )
}