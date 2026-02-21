import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { slug },
  })

  if (!shortUrl) return NextResponse.redirect(new URL('/', req.url))

  await prisma.clickLog.create({
    data: {
      shortUrlId: shortUrl.id,
      userAgent: req.headers.get('user-agent'),
      referer: req.headers.get('referer'),
    },
  })

  await prisma.shortUrl.update({
    where: { id: shortUrl.id },
    data: { clicks: { increment: 1 } },
  })

  return NextResponse.redirect(shortUrl.fullUrl)
}