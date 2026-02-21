import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const shortUrl = await prisma.shortUrl.findFirst({
    where: { id: params.id, userId },
  })
  if (!shortUrl) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const logs = await prisma.clickLog.findMany({
    where: { shortUrlId: params.id },
    orderBy: { clickedAt: 'desc' },
    take: 50,
  })

  return NextResponse.json(logs)
}