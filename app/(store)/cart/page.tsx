'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'
import { formatPrice } from '@/components/ui/Price'

export default function CartPage() {
  const { cart, isLoading, updateItem, removeItem } = useCart()

  if (!cart || cart.items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="h-20 w-20 text-[#222]" />
        <h1 className="font-display text-4xl text-white tracking-wide">YOUR CART IS EMPTY</h1>
        <p className="text-[#666] text-sm">Add some products and come back.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#c8922a] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#e0a830] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-[#c8922a]" />
            <span className="text-[#c8922a] text-[10px] uppercase tracking-[0.4em]">
              {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white tracking-wide">YOUR CART</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-4 sm:gap-6 p-4 bg-[#0f0f0f] border border-[#1a1a1a]"
              >
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-[#141414]">
                  {item.image ? (
                    <Image
                      src={item.image.url}
                      alt={item.image.altText ?? item.title}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-[#333]" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-2">
                  <Link
                    href={`/products/${item.handle}`}
                    className="text-white font-medium hover:text-[#c8922a] transition-colors leading-snug"
                  >
                    {item.title}
                  </Link>
                  {item.variantTitle !== 'Default Title' && (
                    <span className="text-[#555] text-xs">{item.variantTitle}</span>
                  )}
                  <span className="text-[#c8922a] font-bold">
                    {formatPrice(item.price, item.currencyCode)}
                  </span>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex items-center border border-[#2a2a2a]">
                      <button
                        onClick={() => {
                          if (item.quantity === 1) removeItem(item.id)
                          else updateItem(item.id, item.quantity - 1)
                        }}
                        disabled={isLoading}
                        className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        disabled={isLoading}
                        className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-[#555] text-sm ml-auto">
                      {formatPrice(
                        (parseFloat(item.price) * item.quantity).toFixed(2),
                        item.currencyCode
                      )}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="text-[#444] hover:text-red-400 transition-colors disabled:opacity-50"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#555] hover:text-white transition-colors text-xs uppercase tracking-widest mt-4"
            >
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 sticky top-24">
              <h2 className="font-display text-2xl text-white tracking-wide mb-6">
                ORDER SUMMARY
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-[#888]">
                  <span>Subtotal ({cart.totalQuantity} items)</span>
                  <span>{formatPrice(cart.subtotalAmount, cart.currencyCode)}</span>
                </div>
                {parseFloat(cart.taxAmount) > 0 && (
                  <div className="flex justify-between text-sm text-[#888]">
                    <span>Tax</span>
                    <span>{formatPrice(cart.taxAmount, cart.currencyCode)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-[#888]">
                  <span>Shipping</span>
                  <span className="text-[#555]">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-[#1a1a1a] flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-[#c8922a]">
                    {formatPrice(cart.totalAmount, cart.currencyCode)}
                  </span>
                </div>
              </div>

              <a
                href={cart.checkoutUrl}
                className="flex items-center justify-center gap-2 w-full bg-[#c8922a] text-black font-bold uppercase tracking-widest text-sm py-4 hover:bg-[#e0a830] transition-colors"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </a>

              <p className="text-[#444] text-xs text-center mt-4 uppercase tracking-widest">
                Secure checkout via Shopify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
