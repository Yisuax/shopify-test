import { shopifyFetch } from './client'
import {
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_RECOMMENDATIONS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from './queries/products'
import { GET_COLLECTION_QUERY, GET_COLLECTIONS_QUERY } from './queries/collections'
import { GET_CART_QUERY } from './queries/cart'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './mutations/cart'
import type { ShopifyProduct, ShopifyCollection, ShopifyCart } from './types'
import {
  getMockProduct,
  getMockProducts,
  getMockCollection,
  getMockCollections,
  searchMockProducts,
  getMockFeaturedProducts,
} from '../mock-data'

// ---------------------------------------------------------------------------
// Response shape helpers
// ---------------------------------------------------------------------------

interface ProductResponse {
  product: ShopifyProduct | null
}

interface ProductsResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null }
    edges: { node: ShopifyProduct }[]
  }
}

interface ProductRecommendationsResponse {
  productRecommendations: ShopifyProduct[]
}

interface CollectionResponse {
  collection: ShopifyCollection | null
}

interface CollectionsResponse {
  collections: { edges: { node: ShopifyCollection }[] }
}

interface CartResponse {
  cart: ShopifyCart | null
}

interface CartCreateResponse {
  cartCreate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

interface CartLinesAddResponse {
  cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

interface CartLinesUpdateResponse {
  cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

interface CartLinesRemoveResponse {
  cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductResponse>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
    tags: [`product:${handle}`],
  })

  if (data?.product) return data.product
  return getMockProduct(handle)
}

export async function getProducts(first = 12, after?: string): Promise<{
  products: ShopifyProduct[]
  hasNextPage: boolean
  endCursor: string | null
}> {
  const data = await shopifyFetch<ProductsResponse>({
    query: GET_PRODUCTS_QUERY,
    variables: { first, after },
    tags: ['products'],
  })

  if (data?.products) {
    return {
      products: data.products.edges.map((e) => e.node),
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
    }
  }

  const products = getMockProducts(first)
  return { products, hasNextPage: false, endCursor: null }
}

export async function getFeaturedProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: 6 },
    tags: ['products'],
  })

  if (data?.products) {
    return data.products.edges.map((e) => e.node).slice(0, 6)
  }

  return getMockFeaturedProducts()
}

export async function getProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductRecommendationsResponse>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    tags: ['products'],
  })

  if (data?.productRecommendations?.length) return data.productRecommendations.slice(0, 4)
  return getMockProducts(4)
}

export async function searchProducts(query: string): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first: 20 },
    cache: 'no-store',
  })

  if (data?.products) return data.products.edges.map((e) => e.node)
  return searchMockProducts(query)
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export async function getCollection(handle: string, productCount = 20): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<CollectionResponse>({
    query: GET_COLLECTION_QUERY,
    variables: { handle, first: productCount },
    tags: [`collection:${handle}`],
  })

  if (data?.collection) return data.collection
  return getMockCollection(handle)
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<CollectionsResponse>({
    query: GET_COLLECTIONS_QUERY,
    tags: ['collections'],
  })

  if (data?.collections) return data.collections.edges.map((e) => e.node)
  return getMockCollections()
}

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartResponse>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  })

  return data?.cart ?? null
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartCreateResponse>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    cache: 'no-store',
  })

  return data?.cartCreate?.cart ?? null
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesAddResponse>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  return data?.cartLinesAdd?.cart ?? null
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesUpdateResponse>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  return data?.cartLinesUpdate?.cart ?? null
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<CartLinesRemoveResponse>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })

  return data?.cartLinesRemove?.cart ?? null
}
