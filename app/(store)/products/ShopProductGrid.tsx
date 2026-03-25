'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/components/ui/Price'
import type { ShopifyProduct } from '@/lib/shopify/types'

interface ShopProductGridProps {
  products: ShopifyProduct[]
  total: number
  currentPage: number
  totalPages: number
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'NEWEST ARRIVALS' },
  { value: 'price-asc', label: 'PRICE: LOW TO HIGH' },
  { value: 'price-desc', label: 'PRICE: HIGH TO LOW' },
  { value: 'popular', label: 'POPULARITY' },
]

export default function ShopProductGrid({
  products,
  total,
  currentPage,
  totalPages,
}: ShopProductGridProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') ?? 'newest'

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null) params.delete(key)
    else params.set(key, value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function goToPage(page: number) {
    updateParam('page', page === 1 ? null : String(page))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="flex-1 space-y-8 min-w-0">
      {/* Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#1C1B1B] border-l-4 border-[#F8BC51]">
        <div className="font-['Barlow_Condensed'] text-sm tracking-widest text-[#E5E2E1]">
          SHOWING{' '}
          <span className="text-[#F8BC51] font-bold">{products.length}</span> OF{' '}
          <span className="text-[#F8BC51] font-bold">{total}</span> PRODUCTS
        </div>
        <div className="flex items-center gap-4">
          <span className="font-['Barlow_Condensed'] text-xs text-[#9C8F7C] uppercase">SORT BY:</span>
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value === 'newest' ? null : e.target.value)}
            className="bg-[#353534] border-none text-[#E5E2E1] font-['Barlow_Condensed'] text-sm focus:outline-none focus:ring-1 focus:ring-[#F8BC51] h-10 px-4 cursor-pointer"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 bg-[#201F1F] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#504536]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className="font-['Bebas_Neue'] text-2xl tracking-widest text-[#E5E2E1]">NO PRODUCTS FOUND</p>
          <p className="font-['Barlow'] text-sm text-[#9C8F7C]">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-12 pb-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-10 h-10 flex items-center justify-center bg-[#2A2A2A] text-[#9C8F7C] hover:text-[#F8BC51] border border-[#504536]/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
            const page = i + 1
            const isActive = page === currentPage
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 flex items-center justify-center font-['Barlow_Condensed'] font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-[#F8BC51] text-[#422C00] shadow-lg shadow-[#F8BC51]/20'
                    : 'bg-[#2A2A2A] text-[#E5E2E1] hover:bg-[#353534]'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}

          {totalPages > 7 && (
            <>
              <span className="px-2 text-[#9C8F7C]">...</span>
              <button
                onClick={() => goToPage(totalPages)}
                className={`w-10 h-10 flex items-center justify-center font-['Barlow_Condensed'] font-bold text-sm bg-[#2A2A2A] text-[#E5E2E1] hover:bg-[#353534] transition-all ${
                  currentPage === totalPages ? 'bg-[#F8BC51] text-[#422C00]' : ''
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="w-10 h-10 flex items-center justify-center bg-[#2A2A2A] text-[#9C8F7C] hover:text-[#F8BC51] border border-[#504536]/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

function ShopProductCard({ product }: { product: ShopifyProduct }) {
  const { addItem, openCart } = useCart()
  const [adding, setAdding] = useState(false)

  const firstVariant = product.variants.edges[0]?.node
  const isNew = product.tags.includes('new')
  const isFeatured = product.tags.includes('featured')
  const isOnSale =
    firstVariant?.compareAtPrice &&
    parseFloat(firstVariant.compareAtPrice.amount) > parseFloat(firstVariant.price.amount)

  // Deterministic mock rating derived from product id
  const idNum = parseInt(product.id.replace(/\D/g, '').slice(-4) || '0', 10)
  const rating = 4.5 + (idNum % 10) / 20 // 4.5 – 4.95

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (!firstVariant?.availableForSale) return
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
    openCart()
  }

  return (
    <div className="group bg-[#2A2A2A] overflow-hidden flex flex-col hover:bg-[#201F1F] transition-colors duration-300">
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="relative aspect-square overflow-hidden bg-[#353534] block">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#504536]">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="1" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Badge */}
        {(isNew || isFeatured || isOnSale) && (
          <div className="absolute top-3 left-3">
            {isNew && (
              <div className="bg-[#C6C6CA]/10 backdrop-blur-md px-3 py-1 border border-[#504536]/20">
                <span className="font-['Barlow_Condensed'] text-[10px] font-black tracking-widest text-[#C6C6CA] uppercase">
                  NEW ARRIVAL
                </span>
              </div>
            )}
            {isFeatured && !isNew && (
              <div className="bg-gradient-to-br from-[#F8BC51] to-[#C8922A] px-3 py-1">
                <span className="font-['Barlow_Condensed'] text-[10px] font-black tracking-widest text-[#422C00] uppercase">
                  BEST SELLER
                </span>
              </div>
            )}
            {isOnSale && !isNew && !isFeatured && (
              <div className="bg-gradient-to-br from-[#F8BC51] to-[#C8922A] px-3 py-1">
                <span className="font-['Barlow_Condensed'] text-[10px] font-black tracking-widest text-[#422C00] uppercase">
                  SALE
                </span>
              </div>
            )}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2 flex justify-between items-start">
          <span className="font-['Barlow_Condensed'] text-[10px] tracking-widest text-[#9C8F7C] uppercase">
            {product.productType || product.vendor || 'ACCESSORIES'}
          </span>
          <div className="flex items-center gap-1 text-[#F8BC51]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-[10px] font-bold text-[#E5E2E1] font-['Barlow_Condensed']">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <Link href={`/products/${product.handle}`}>
          <h3 className="font-['Bebas_Neue'] text-2xl tracking-tight text-[#E5E2E1] mb-4 leading-none group-hover:text-[#F8BC51] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-['Bebas_Neue'] text-3xl text-[#F8BC51]">
            {formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            )}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={adding || !product.availableForSale}
            className={`p-3 transition-all active:scale-[0.95] ${
              !product.availableForSale
                ? 'bg-[#353534] text-[#504536] cursor-not-allowed'
                : 'bg-gradient-to-br from-[#F8BC51] to-[#C8922A] text-[#422C00] hover:brightness-110'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {adding ? (
              <span className="inline-block w-5 h-5 border-2 border-[#422C00]/30 border-t-[#422C00] rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
