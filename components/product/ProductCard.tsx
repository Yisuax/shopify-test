'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import type { ShopifyProduct } from '@/lib/shopify/types'
import { formatPrice } from '@/components/ui/Price'
import Badge from '@/components/ui/Badge'
import { useCart } from '@/components/cart/CartContext'

interface ProductCardProps {
  product: ShopifyProduct
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const firstVariant = product.variants.edges[0]?.node
  const isOnSale =
    firstVariant?.compareAtPrice &&
    parseFloat(firstVariant.compareAtPrice.amount) > parseFloat(firstVariant.price.amount)
  const isNew = product.tags.includes('new')
  const isFeatured = product.tags.includes('featured')

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (!firstVariant || !firstVariant.availableForSale) return

    setAdding(true)
    await addItem(firstVariant.id, 1, {
      id: `optimistic-${Date.now()}`,
      quantity: 1,
      merchandiseId: firstVariant.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price.amount,
      currencyCode: firstVariant.price.currencyCode,
      handle: product.handle,
      image: product.featuredImage,
      selectedOptions: firstVariant.selectedOptions,
    })
    setAdding(false)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <motion.div
      whileHover="hover"
      className="group flex flex-col bg-[#0f0f0f] border border-[#1a1a1a] hover:border-[#c8922a]/40 transition-colors duration-300"
    >
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="relative aspect-square overflow-hidden bg-[#141414]">
        {product.featuredImage ? (
          <motion.div
            className="w-full h-full relative"
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-[#333]" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOnSale && <Badge variant="sale">Sale</Badge>}
          {isNew && <Badge variant="new">New</Badge>}
          {isFeatured && !isNew && !isOnSale && <Badge variant="featured">Featured</Badge>}
          {!product.availableForSale && <Badge variant="outOfStock">Sold Out</Badge>}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Link
          href={`/products/${product.handle}`}
          className="text-white text-sm font-medium leading-snug hover:text-[#c8922a] transition-colors line-clamp-2"
        >
          {product.title}
        </Link>

        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-[#c8922a] font-bold text-base">
            {formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            )}
          </span>
          {isOnSale && firstVariant?.compareAtPrice && (
            <span className="text-[#555] line-through text-sm">
              {formatPrice(
                firstVariant.compareAtPrice.amount,
                firstVariant.compareAtPrice.currencyCode
              )}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={adding || !product.availableForSale || !firstVariant?.availableForSale}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
            !product.availableForSale || !firstVariant?.availableForSale
              ? 'bg-[#1a1a1a] text-[#444] cursor-not-allowed'
              : added
              ? 'bg-green-600/80 text-white'
              : 'bg-[#c8922a] text-black hover:bg-[#e0a830]'
          }`}
          aria-label={
            !product.availableForSale
              ? 'Out of stock'
              : `Add ${product.title} to cart`
          }
        >
          {!product.availableForSale || !firstVariant?.availableForSale ? (
            'Out of Stock'
          ) : added ? (
            <>
              <Check className="h-3.5 w-3.5" /> Added
            </>
          ) : adding ? (
            <span className="inline-block h-3.5 w-3.5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
