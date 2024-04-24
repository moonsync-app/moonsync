import { NextRequest, NextResponse } from 'next/server'

// run only on chat page
export const config = {
  matcher: '/chat',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo.country || 'US'
  const city = geo.city || 'New York'
  const region = geo.region || 'NY'

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)

  return NextResponse.rewrite(url)
}
