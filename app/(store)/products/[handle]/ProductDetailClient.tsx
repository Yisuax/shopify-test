'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/components/ui/Price'
import type { ShopifyProduct } from '@/lib/shopify/types'

interface ProductDetailClientProps {
  product: ShopifyProduct
}

const STAR_RATING = 4.8
const REVIEW_COUNT = 48

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, openCart } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.edges[0]?.node.id ?? ''
  )
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')

  const selectedVariant = product.variants.edges.find(
    (e) => e.node.id === selectedVariantId
  )?.node

  const images = product.images.edges.map((e) => e.node)
  const displayImages = images.length > 0 ? images : product.featuredImage ? [product.featuredImage] : []

  const isOnSale =
    selectedVariant?.compareAtPrice &&
    parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount)

  // Build option state from selected variant
  const selectedOptions = selectedVariant?.selectedOptions ?? []

  function handleOptionChange(optionName: string, value: string) {
    const currentOptions = selectedOptions.map((opt) =>
      opt.name === optionName ? { ...opt, value } : opt
    )
    const match = product.variants.edges.find(({ node: v }) =>
      v.selectedOptions.every((opt) =>
        currentOptions.some((co) => co.name === opt.name && co.value === opt.value)
      )
    )
    if (match) setSelectedVariantId(match.node.id)
  }

  const handleAddToCart = useCallback(async () => {
    if (!selectedVariant?.availableForSale) return
    setAdding(true)
    await addItem(selectedVariant.id, quantity, {
      id: `optimistic-${Date.now()}`,
      quantity,
      merchandiseId: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      currencyCode: selectedVariant.price.currencyCode,
      handle: product.handle,
      image: product.featuredImage,
      selectedOptions: selectedVariant.selectedOptions,
    })
    setAdding(false)
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2500)
  }, [selectedVariant, quantity, addItem, openCart, product])

  // Determine if options are colors (single-char or short) vs sizes
  const isColorOption = (optionName: string) =>
    ['color', 'finish', 'material', 'colour'].includes(optionName.toLowerCase())

  // Skip "Default Title" option
  const displayOptions = product.options.filter(
    (opt) => !(opt.name === 'Title' && opt.values.length === 1 && opt.values[0] === 'Default Title')
  )

  const stars = Math.round(STAR_RATING)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      {/* ── LEFT: Gallery ────────────────────────────────────────────── */}
      <div className="lg:col-span-7 space-y-4">
        {/* Main image */}
        <div className="aspect-square bg-[#0E0E0E] flex items-center justify-center p-8 sm:p-12 relative group overflow-hidden">
          {displayImages.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 p-8 sm:p-12"
              >
                <Image
                  src={displayImages[activeImage].url}
                  alt={displayImages[activeImage].altText ?? product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain p-8 sm:p-12"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0E0E0E]">
              <svg viewBox="0 0 100 100" className="w-1/4 h-1/4 opacity-20" fill="none" stroke="#F8BC51" strokeWidth="3" aria-hidden="true">
                <path d="M50 8 L87 29 L87 71 L50 92 L13 71 L13 29 Z" />
                <path d="M50 27 L70 38.5 L70 61.5 L50 73 L30 61.5 L30 38.5 Z" />
                <circle cx="50" cy="50" r="9" />
              </svg>
            </div>
          )}
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Thumbnail strip */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-5 gap-3">
            {displayImages.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-square p-2 transition-all duration-150 ${
                  i === activeImage
                    ? 'bg-[#2A2A2A] border border-[#F8BC51]'
                    : 'bg-[#2A2A2A] border border-transparent hover:bg-[#353534] hover:border-[#504536]'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.altText ?? `${product.title} ${i + 1}`}
                  width={80}
                  height={80}
                  className={`w-full h-full object-contain transition-opacity ${
                    i === activeImage ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT: Product Info ───────────────────────────────────────── */}
      <div className="lg:col-span-5 flex flex-col">
        {/* Brand/Vendor label */}
        <p className="font-['Barlow_Condensed'] text-[#F8BC51] tracking-[0.3em] text-xs font-bold mb-2 uppercase">
          {product.vendor || 'VIKING CHROME SHOP'}
        </p>

        {/* Title */}
        <h1 className="font-['Bebas_Neue'] text-4xl sm:text-5xl leading-[0.9] text-[#E5E2E1] mb-4">
          {product.title}
        </h1>

        {/* Stars + reviews + stock */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex text-[#F8BC51]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4"
                fill={i < stars ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="font-['Barlow_Condensed'] text-xs text-[#9C8F7C] tracking-widest">
            ({REVIEW_COUNT} REVIEWS)
          </span>
          {product.availableForSale && (
            <span className="bg-[#F8BC51]/10 text-[#F8BC51] text-[10px] font-bold px-3 py-1 tracking-widest uppercase border border-[#F8BC51]/20">
              IN STOCK
            </span>
          )}
          {!product.availableForSale && (
            <span className="bg-[#FFAB91]/10 text-[#FFAB91] text-[10px] font-bold px-3 py-1 tracking-widest uppercase border border-[#FFAB91]/20">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-4 mb-8">
          <span className="font-['Bebas_Neue'] text-4xl text-[#F8BC51] tracking-tight">
            {selectedVariant
              ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
              : formatPrice(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.minVariantPrice.currencyCode
                )}
          </span>
          {isOnSale && selectedVariant?.compareAtPrice && (
            <span className="font-['Bebas_Neue'] text-xl text-[#C6C6CA] line-through opacity-50 tracking-tight">
              {formatPrice(
                selectedVariant.compareAtPrice.amount,
                selectedVariant.compareAtPrice.currencyCode
              )}
            </span>
          )}
        </div>

        {/* Variant selectors */}
        {displayOptions.length > 0 && (
          <div className="space-y-6 mb-8">
            {displayOptions.map((option) => {
              const selectedValue = selectedOptions.find((o) => o.name === option.name)?.value

              if (isColorOption(option.name)) {
                // Color swatches
                return (
                  <div key={option.id}>
                    <label className="block font-['Barlow_Condensed'] text-xs font-bold tracking-[0.2em] mb-3 text-[#E5E2E1] uppercase">
                      {option.name.toUpperCase()}:{' '}
                      <span className="text-[#F8BC51]">{selectedValue?.toUpperCase()}</span>
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {option.values.map((value) => {
                        const isSelected = selectedValue === value
                        const variantForValue = product.variants.edges.find(({ node: v }) =>
                          v.selectedOptions.some(
                            (opt) => opt.name === option.name && opt.value === value
                          )
                        )?.node
                        const isAvailable = variantForValue?.availableForSale ?? false

                        return (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            disabled={!isAvailable}
                            title={value}
                            className={`w-12 h-12 border-2 transition-all duration-150 ${
                              isSelected
                                ? 'border-[#F8BC51] ring-2 ring-[#131313]'
                                : isAvailable
                                ? 'border-[#504536] hover:border-[#F8BC51]'
                                : 'border-[#2A2A2A] opacity-40 cursor-not-allowed'
                            } bg-[#2A2A2A] flex items-center justify-center`}
                            aria-pressed={isSelected}
                            aria-label={`${option.name}: ${value}${!isAvailable ? ' (unavailable)' : ''}`}
                          >
                            <span className="font-['Barlow_Condensed'] text-[10px] tracking-wider text-[#E5E2E1] uppercase">
                              {value.slice(0, 3)}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              // Size pills
              return (
                <div key={option.id}>
                  <label className="block font-['Barlow_Condensed'] text-xs font-bold tracking-[0.2em] mb-3 text-[#E5E2E1] uppercase">
                    {option.name.toUpperCase()}:{' '}
                    <span className="text-[#F8BC51]">{selectedValue?.toUpperCase()}</span>
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {option.values.map((value) => {
                      const isSelected = selectedValue === value
                      const variantForValue = product.variants.edges.find(({ node: v }) =>
                        v.selectedOptions.some(
                          (opt) => opt.name === option.name && opt.value === value
                        )
                      )?.node
                      const isAvailable = variantForValue?.availableForSale ?? false

                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          disabled={!isAvailable}
                          className={`px-6 py-3 font-['Barlow_Condensed'] text-sm transition-all duration-150 ${
                            isSelected
                              ? 'border-2 border-[#F8BC51] text-[#F8BC51] font-bold'
                              : isAvailable
                              ? 'border border-[#504536] text-[#C6C6CA] hover:border-[#F8BC51] hover:text-[#E5E2E1]'
                              : 'border border-[#2A2A2A] text-[#504536] cursor-not-allowed line-through'
                          }`}
                          aria-pressed={isSelected}
                        >
                          {value.toUpperCase()}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Quantity + Add to Cart */}
        <div className="flex gap-4 mb-6">
          {/* Quantity */}
          <div className="flex items-center bg-[#2A2A2A] h-14 px-2 shrink-0">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-[#C6C6CA] hover:text-[#F8BC51] transition-colors"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="w-10 bg-transparent text-center font-['Barlow_Condensed'] font-bold text-[#E5E2E1] text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center text-[#C6C6CA] hover:text-[#F8BC51] transition-colors"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding || !selectedVariant?.availableForSale}
            className={`flex-1 font-['Bebas_Neue'] text-xl tracking-widest h-14 transition-all duration-200 active:scale-[0.98] ${
              !selectedVariant?.availableForSale
                ? 'bg-[#2A2A2A] text-[#504536] cursor-not-allowed'
                : added
                ? 'bg-[#2A2A2A] text-[#F8BC51] border border-[#F8BC51]'
                : 'bg-gradient-to-br from-[#F8BC51] to-[#C8922A] text-[#422C00] hover:brightness-110'
            }`}
          >
            {!selectedVariant?.availableForSale ? (
              'OUT OF STOCK'
            ) : added ? (
              'ADDED TO CART ✓'
            ) : adding ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-[#422C00]/40 border-t-[#422C00] rounded-full animate-spin" />
                ADDING...
              </span>
            ) : (
              'ADD TO CART'
            )}
          </button>
        </div>

        {/* Buy It Now */}
        <button
          className="w-full border-2 border-[#504536] text-[#E5E2E1] font-['Bebas_Neue'] text-xl tracking-widest h-14 hover:border-[#F8BC51] hover:text-[#F8BC51] transition-all mb-10"
          onClick={() => {
            if (selectedVariant?.availableForSale) {
              handleAddToCart()
            }
          }}
        >
          BUY IT NOW
        </button>

        {/* Trust signals */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-4 pb-10 border-b border-[#504536]/20">
          {[
            { icon: 'shield', label: 'SECURE PAYMENT' },
            { icon: 'truck', label: 'FREE SHIPPING $99+' },
            { icon: 'settings', label: 'MACHINED PRECISION' },
            { icon: 'refresh', label: '30-DAY RETURNS' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <TrustIcon name={icon} />
              <span className="font-['Barlow_Condensed'] text-[10px] tracking-widest font-bold text-[#E5E2E1]">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="mt-6 space-y-0">
          {[
            {
              id: 'description',
              label: 'DESCRIPTION',
              content: <div className="text-sm text-[#9C8F7C] leading-relaxed font-['Barlow']" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />,
            },
            {
              id: 'fitment',
              label: 'FITMENT',
              content: (
                <div className="text-sm text-[#9C8F7C] font-['Barlow']">
                  {product.tags.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {product.tags.filter((t) => !['new', 'featured', 'sale', 'exhaust', 'chrome'].includes(t)).slice(0, 5).map((tag) => (
                        <li key={tag} className="capitalize">{tag.replace(/-/g, ' ')}</li>
                      ))}
                      {product.tags.length === 0 && <li>Universal fitment — see product description for details</li>}
                    </ul>
                  ) : (
                    <p>See product description for fitment details.</p>
                  )}
                </div>
              ),
            },
            {
              id: 'shipping',
              label: 'SHIPPING & RETURNS',
              content: (
                <p className="text-sm text-[#9C8F7C] leading-relaxed font-['Barlow']">
                  Orders ship within 24 hours. Express 2-day delivery available at checkout. Items must be in original packaging with no mounting marks for full returns within 30 days.
                </p>
              ),
            },
          ].map(({ id, label, content }) => (
            <div key={id} className="border-b border-[#504536]/10 pb-4 pt-4">
              <button
                onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
                className={`flex justify-between items-center w-full font-['Barlow_Condensed'] text-sm font-bold tracking-widest transition-colors ${
                  openAccordion === id ? 'text-[#F8BC51]' : 'text-[#E5E2E1]'
                }`}
              >
                {label}
                <motion.svg
                  animate={{ rotate: openAccordion === id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4">{content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Small helper to avoid importing from lucide for these specific icons
function TrustIcon({ name }: { name: string }) {
  const className = 'w-5 h-5 text-[#F8BC51]'
  switch (name) {
    case 'shield':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'truck':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'settings':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        </svg>
      )
    case 'refresh':
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 .49-3.4" />
        </svg>
      )
    default:
      return null
  }
}

