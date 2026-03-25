const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const SHOPIFY_STOREFRONT_API_URL = domain
  ? `https://${domain}/api/2024-01/graphql.json`
  : null

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
    return null
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Only add the token header if the env var is present
  if (token) {
    headers['X-Shopify-Storefront-Access-Token'] = token
  }

  try {
    const res = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache,
      next: tags ? { tags } : undefined,
    })

    if (!res.ok) {
      console.error(`Shopify API error: ${res.status}`)
      return null
    }

    const json = await res.json()

    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors[0]?.message)
      return null
    }

    return json.data as T
  } catch (err) {
    console.error('Shopify fetch failed:', err)
    return null
  }
}
