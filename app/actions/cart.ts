'use server'

import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { createCart, addToCart, updateCart, removeFromCart, getCart } from '@/lib/shopify'
import type { Cart, ShopifyCart } from '@/lib/shopify/types'

const CART_COOKIE = 'shopify_cart_id'

function normalizeCart(shopifyCart: ShopifyCart): Cart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    totalAmount: shopifyCart.cost.totalAmount.amount,
    subtotalAmount: shopifyCart.cost.subtotalAmount.amount,
    taxAmount: shopifyCart.cost.totalTaxAmount?.amount ?? '0.00',
    currencyCode: shopifyCart.cost.totalAmount.currencyCode,
    items: shopifyCart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: node.merchandise.price.amount,
      currencyCode: node.merchandise.price.currencyCode,
      handle: node.merchandise.product.handle,
      image: node.merchandise.product.featuredImage,
      selectedOptions: node.merchandise.selectedOptions,
    })),
  }
}

async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(CART_COOKIE)?.value
}

async function setCartId(cartId: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export async function getCartAction(): Promise<Cart | null> {
  const cartId = await getCartId()
  if (!cartId) return null

  const shopifyCart = await getCart(cartId)
  if (!shopifyCart) return null

  return normalizeCart(shopifyCart)
}

export async function addToCartAction(
  merchandiseId: string,
  quantity = 1
): Promise<{ cart: Cart | null; error?: string }> {
  console.log('[cart] ADD TO CART CALLED', { variantId: merchandiseId, quantity })
  try {
    let cartId = await getCartId()
    let shopifyCart: ShopifyCart | null = null

    if (cartId) {
      shopifyCart = await addToCart(cartId, [{ merchandiseId, quantity }])
      console.log('[cart] MUTATION RESULT (cartLinesAdd)', shopifyCart ? 'success' : 'null')
    }

    if (!shopifyCart) {
      // Either no cart yet or add failed — create a fresh one
      shopifyCart = await createCart([{ merchandiseId, quantity }])
      console.log('[cart] MUTATION RESULT (cartCreate)', shopifyCart ? 'success id=' + shopifyCart.id : 'null')
    }

    if (!shopifyCart) {
      const error = 'Failed to create cart'
      console.log('[cart] ERROR', error)
      return { cart: null, error }
    }

    await setCartId(shopifyCart.id)
    revalidateTag('cart', 'max')

    return { cart: normalizeCart(shopifyCart) }
  } catch (err) {
    console.log('[cart] ERROR', err)
    console.error('[cart] addToCartAction error:', err)
    return { cart: null, error: 'An unexpected error occurred' }
  }
}

export async function updateCartAction(
  lineId: string,
  quantity: number
): Promise<{ cart: Cart | null; error?: string }> {
  try {
    const cartId = await getCartId()
    if (!cartId) return { cart: null, error: 'No cart found' }

    const shopifyCart = await updateCart(cartId, [{ id: lineId, quantity }])
    if (!shopifyCart) return { cart: null, error: 'Update failed' }

    revalidateTag('cart', 'max')
    return { cart: normalizeCart(shopifyCart) }
  } catch (err) {
    console.error('[cart] updateCartAction error:', err)
    return { cart: null, error: 'An unexpected error occurred' }
  }
}

export async function removeFromCartAction(
  lineId: string
): Promise<{ cart: Cart | null; error?: string }> {
  try {
    const cartId = await getCartId()
    if (!cartId) return { cart: null, error: 'No cart found' }

    const shopifyCart = await removeFromCart(cartId, [lineId])
    if (!shopifyCart) return { cart: null, error: 'Remove failed' }

    revalidateTag('cart', 'max')
    return { cart: normalizeCart(shopifyCart) }
  } catch (err) {
    console.error('[cart] removeFromCartAction error:', err)
    return { cart: null, error: 'An unexpected error occurred' }
  }
}
