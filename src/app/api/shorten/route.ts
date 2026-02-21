import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'กรุณาเข้าสู่ระบบก่อน' }, { status: 401 })

  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'กรุณากรอก URL' }, { status: 400 })

  try { new URL(url) }
  catch { return NextResponse.json({ error: 'URL ไม่ถูกต้อง' }, { status: 400 }) }

  const slug = nanoid(7)
  const shortUrl = await prisma.shortUrl.create({
    data: { slug, fullUrl: url, userId },
  })

  return NextResponse.json({ slug: shortUrl.slug, id: shortUrl.id })
}