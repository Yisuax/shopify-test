'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from './CartContext'
import { formatPrice } from '@/components/ui/Price'

const FREE_SHIPPING_THRESHOLD = 99

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const subtotal = cart ? parseFloat(cart.subtotalAmount) : 0
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50 flex flex-col bg-[#1C1B1B] border-l border-[#504536]/20"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#504536]/15">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#F8BC51]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="font-['Bebas_Neue'] text-lg tracking-widest text-[#E5E2E1]">
                  YOUR CART{' '}
                  {cart && cart.totalQuantity > 0 && (
                    <span className="text-[#F8BC51]">({cart.totalQuantity} {cart.totalQuantity === 1 ? 'ITEM' : 'ITEMS'})</span>
                  )}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="text-[#9C8F7C] hover:text-[#E5E2E1] transition-colors p-1"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Free shipping progress */}
            {cart && cart.items.length > 0 && (
              <div className="px-6 py-3 bg-[#201F1F]">
                {remainingForFreeShipping > 0 ? (
                  <p className="font-['Barlow_Condensed'] text-[10px] tracking-widest text-[#9C8F7C] mb-2">
                    ADD <span className="text-[#F8BC51] font-bold">{formatPrice(remainingForFreeShipping.toFixed(2))}</span> FOR FREE SHIPPING
                  </p>
                ) : (
                  <p className="font-['Barlow_Condensed'] text-[10px] tracking-widest text-[#F8BC51] font-bold mb-2">
                    YOU QUALIFY FOR FREE SHIPPING
                  </p>
                )}
                <div className="h-1 bg-[#353534] w-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#F8BC51] to-[#C8922A] transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-0">
              {!cart || cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center py-16">
                  <div className="w-20 h-20 bg-[#201F1F] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#504536]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-['Bebas_Neue'] text-xl tracking-widest text-[#E5E2E1] mb-2">YOUR CART IS EMPTY</p>
                    <p className="font-['Barlow'] text-xs text-[#9C8F7C] tracking-wide">Add some legendary gear to get started.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="font-['Barlow_Condensed'] text-[#F8BC51] text-xs uppercase tracking-widest hover:text-[#E5E2E1] transition-colors font-bold"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 py-5 border-b border-[#504536]/10"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 shrink-0 bg-[#201F1F]">
                        {item.image ? (
                          <Image
                            src={item.image.url}
                            alt={item.image.altText ?? item.title}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#504536]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <rect width="20" height="20" x="2" y="2" rx="1" />
                              <path d="M9 9h.01M15 9h.01" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={closeCart}
                          className="font-['Barlow'] text-sm text-[#E5E2E1] hover:text-[#F8BC51] transition-colors line-clamp-2 leading-snug font-medium"
                        >
                          {item.title}
                        </Link>
                        {item.variantTitle !== 'Default Title' && (
                          <span className="font-['Barlow_Condensed'] text-[10px] text-[#9C8F7C] tracking-wider uppercase">
                            {item.variantTitle}
                          </span>
                        )}
                        <span className="font-['Bebas_Neue'] text-base text-[#F8BC51] tracking-wider">
                          {formatPrice(item.price, item.currencyCode)}
                        </span>

                        {/* Quantity + remove */}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center bg-[#2A2A2A] h-8">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item.id)
                                } else {
                                  updateItem(item.id, item.quantity - 1)
                                }
                              }}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center text-[#C6C6CA] hover:text-[#F8BC51] transition-colors disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                            <span className="font-['Barlow_Condensed'] text-[#E5E2E1] text-sm font-bold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateItem(item.id, item.quantity + 1)}
                              disabled={isLoading}
                              className="w-8 h-8 flex items-center justify-center text-[#C6C6CA] hover:text-[#F8BC51] transition-colors disabled:opacity-40"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </svg>
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            className="ml-auto text-[#504536] hover:text-[#FFAB91] transition-colors disabled:opacity-40"
                            aria-label="Remove item"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart && cart.items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#504536]/15 space-y-4 bg-[#1C1B1B]">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-['Barlow_Condensed'] tracking-widest text-[#9C8F7C] uppercase">
                    <span>SUBTOTAL</span>
                    <span className="text-[#E5E2E1]">{formatPrice(cart.subtotalAmount, cart.currencyCode)}</span>
                  </div>
                  {parseFloat(cart.taxAmount) > 0 && (
                    <div className="flex justify-between text-xs font-['Barlow_Condensed'] tracking-widest text-[#9C8F7C] uppercase">
                      <span>TAX</span>
                      <span className="text-[#E5E2E1]">{formatPrice(cart.taxAmount, cart.currencyCode)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-[#504536]/10">
                    <span className="font-['Bebas_Neue'] tracking-widest text-[#E5E2E1] text-base">TOTAL</span>
                    <span className="font-['Bebas_Neue'] text-xl text-[#F8BC51] tracking-wider">
                      {formatPrice(cart.totalAmount, cart.currencyCode)}
                    </span>
                  </div>
                </div>

                <a
                  href={cart.checkoutUrl}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-[#F8BC51] to-[#C8922A] text-[#422C00] font-['Bebas_Neue'] text-xl tracking-widest h-14 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  CHECKOUT
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full font-['Barlow_Condensed'] text-[#9C8F7C] text-xs uppercase tracking-widest hover:text-[#E5E2E1] transition-colors py-1"
                >
                  VIEW FULL CART
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
