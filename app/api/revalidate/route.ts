import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body: unknown = await req.json()

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
    }

    const payload = body as Record<string, unknown>
    const topic = String(payload.topic ?? '')
    const id = String((payload as Record<string, unknown>).id ?? 'unknown')

    // Revalidate based on Shopify webhook topic
    if (topic.startsWith('products/')) {
      revalidateTag('products', 'max')
      const handle = payload.handle
      if (typeof handle === 'string') {
        revalidateTag(`product:${handle}`, 'max')
      }
      console.log(`[revalidate] products topic=${topic} id=${id}`)
    } else if (topic.startsWith('collections/')) {
      revalidateTag('collections', 'max')
      const handle = payload.handle
      if (typeof handle === 'string') {
        revalidateTag(`collection:${handle}`, 'max')
      }
      console.log(`[revalidate] collections topic=${topic} id=${id}`)
    } else {
      // Fallback — revalidate everything
      revalidateTag('products', 'max')
      revalidateTag('collections', 'max')
      console.log(`[revalidate] fallback topic=${topic} id=${id}`)
    }

    return NextResponse.json({ revalidated: true, topic, id })
  } catch (err) {
    console.error('[revalidate] error:', err)
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
