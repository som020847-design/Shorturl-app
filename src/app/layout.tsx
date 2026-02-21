import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: 'BREVIO — Luxury URL Shortener',
  description:
    'ย่อ URL ให้สั้นกระชับ สวยงาม พร้อม QR Code และ Analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="th">
        <body className="relative overflow-x-hidden">

          {/* Background mesh */}
          <div className="bg-mesh absolute inset-0 -z-20" />



          {/* 🌸 Flower */}
          <Image
            src="/flower.png"
            alt="flower"
            width={100}
            height={140}
            className="floating-flower"
          />

          {/* Main content */}
          <div className="relative z-10 pb-24">
            {children}
          </div>

          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#13131a',
                color: '#f0ece0',
                border: '1px solid rgba(201,168,76,0.3)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.875rem',
              },
              success: {
                iconTheme: {
                  primary: '#c9a84c',
                  secondary: '#1a1200',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}