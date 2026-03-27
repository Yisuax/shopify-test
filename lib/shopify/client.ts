// Strip any accidental trailing slash or appended .myshopify.com duplication
const rawDomain = (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '').trim().replace(/\/$/, '')
// If the env var already contains .myshopify.com, use it as-is; otherwise append it
const normalizedDomain = rawDomain.endsWith('.myshopify.com')
  ? rawDomain
  : rawDomain
    ? `${rawDomain}.myshopify.com`
    : ''

// Strip any accidental leading https:// the user may have pasted into the env var
const cleanDomain = normalizedDomain.replace(/^https?:\/\//, '')

const token =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  ''

const SHOPIFY_STOREFRONT_API_URL = cleanDomain
  ? `https://${cleanDomain}/api/2026-01/graphql.json`
  : null

console.log('[shopify] URL:', SHOPIFY_STOREFRONT_API_URL)
console.log('[shopify] token present:', !!token)

// Diagnostic fetch — runs once at module load in server context
if (SHOPIFY_STOREFRONT_API_URL && token) {
  fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query: '{ shop { name } }' }),
    cache: 'no-store',
  })
    .then((r) => r.json())
    .then((json) => console.log('[shopify] diagnostic { shop { name } }:', JSON.stringify(json)))
    .catch((err) => console.error('[shopify] diagnostic fetch failed:', err))
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T | null> {
  if (!SHOPIFY_STOREFRONT_API_URL) {
    console.error('[shopify] NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set')
    return null
  }

  if (!token) {
    console.error('[shopify] Storefront access token is not set')
    return null
  }

  try {
    const res = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: tags ? { tags } : undefined,
    })

    console.log('[shopify] response status:', res.status)

    if (!res.ok) {
      console.error(`[shopify] API error: ${res.status}`)
      return null
    }

    const json = await res.json()

    if (json.errors) {
      console.error('[shopify] GraphQL errors:', json.errors[0]?.message)
      return null
    }

    return json.data as T
  } catch (err) {
    console.error('[shopify] fetch failed:', err)
    return null
  }
}
