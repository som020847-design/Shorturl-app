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

  // ✅ ป้องกัน window error ตอน build
  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : ''

  useEffect(() => {
    fetch('/api/urls')
      .then(r => r.json())
      .then(data => { setUrls(data); setLoading(false) })
      .catch(() => { toast.error('Failed to load history'); setLoading(false) })
  }, [])

  const copyToClipboard = (slug: string) => {
    navigator.clipboard.writeText(`${baseUrl}/r/${slug}`)
    toast.success('Copied!')
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <>
      <div className="mt-10 max-w-3xl mx-auto px-6 pb-24 animate-fade-up-delay-5">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="pixel-font"
            style={{ fontSize: '0.75rem', color: '#111' }}
          >
            URL HISTORY
          </h2>
          <span
            className="pixel-font px-3 py-1.5"
            style={{
              fontSize: '0.45rem',
              border: '2px solid #111',
              boxShadow: '2px 2px 0 #111',
              color: '#111',
            }}
          >
            {urls.length} LINKS
          </span>
        </div>

        {loading ? (
          <div
            className="p-12 text-center"
            style={{ border: '2px solid #111', boxShadow: '4px 4px 0 #111' }}
          >
            <div
              className="w-8 h-8 border-4 border-t-transparent animate-spin mx-auto"
              style={{ borderColor: '#ff2d78', borderTopColor: 'transparent' }}
            />
          </div>
        ) : urls.length === 0 ? (
          <div
            className="p-12 text-center"
            style={{ border: '2px solid #111', boxShadow: '4px 4px 0 #111' }}
          >
            <p
              className="pixel-font"
              style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}
            >
              NO LINKS YET. CREATE YOUR FIRST ONE!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {urls.map((item, i) => (
              <div
                key={item.id}
                className="glass-card p-4 flex items-center gap-4"
              >
                <span
                  className="pixel-font opacity-30 shrink-0"
                  style={{
                    fontSize: '0.45rem',
                    width: '20px',
                    textAlign: 'center',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="pixel-font"
                      style={{
                        fontSize: '0.5rem',
                        color: 'var(--accent)',
                      }}
                    >
                      /r/{item.slug}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)' }}>·</span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{
                        color: 'var(--text-tertiary)',
                        fontSize: '0.7rem',
                      }}
                    >
                      <Clock size={10} />
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {item.fullUrl}
                  </p>
                </div>

                <div
                  className="flex items-center gap-1.5 shrink-0 px-3 py-1.5"
                  style={{
                    border: '2px solid #111',
                    boxShadow: '2px 2px 0 #111',
                  }}
                >
                  <MousePointerClick size={12} style={{ color: 'var(--accent)' }} />
                  <span
                    className="pixel-font"
                    style={{ fontSize: '0.45rem' }}
                  >
                    {item.clicks}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Copy */}
                  <button
                    onClick={() => copyToClipboard(item.slug)}
                    className="p-2 transition-colors hover:bg-gray-100"
                    style={{ color: 'var(--text-secondary)' }}
                    title="Copy"
                  >
                    <Copy size={13} />
                  </button>

                  {/* Open Link */}
                  <a
                    href={`${baseUrl}/r/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 transition-colors hover:bg-gray-100"
                    style={{ color: 'var(--text-secondary)' }}
                    title="Open"
                  >
                    <ExternalLink size={13} />
                  </a>

                  {/* Analytics */}
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className="p-2 transition-colors hover:bg-gray-100 flex items-center gap-1"
                    style={{ color: 'var(--text-secondary)' }}
                    title="Analytics"
                  >
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