import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const urls = await prisma.shortUrl.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, fullUrl: true, clicks: true, createdAt: true },
  })

  return NextResponse.json(urls)
}