import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  console.log("Slug:", slug)

  const shortUrl = await prisma.shortUrl.findUnique({
    where: { slug },
  })

  if (!shortUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // บันทึก click log
  await prisma.clickLog.create({
    data: {
      shortUrlId: shortUrl.id,
      userAgent: req.headers.get("user-agent") || undefined,
      referer: req.headers.get("referer") || undefined,
    },
  })

  // เพิ่มจำนวนคลิก
  await prisma.shortUrl.update({
    where: { id: shortUrl.id },
    data: { clicks: { increment: 1 } },
  })

  return NextResponse.redirect(new URL(shortUrl.fullUrl))
}