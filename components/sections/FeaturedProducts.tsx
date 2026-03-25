'use client'

import Link from 'next/link'
import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import type { ShopifyProduct } from '@/lib/shopify/types'
import ProductCard from '@/components/product/ProductCard'

interface FeaturedProductsProps {
  products: ShopifyProduct[]
  title?: string
  subtitle?: string
  viewAllHref?: string
}

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function FeaturedProducts({
  products,
  title = 'Featured Products',
  subtitle = 'Hand-picked for the serious trucker',
  viewAllHref = '/products',
}: FeaturedProductsProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (products.length === 0) return null

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#c8922a]" />
              <span className="text-[#c8922a] text-[10px] uppercase tracking-[0.4em]">
                {subtitle}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              {title.toUpperCase()}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-[#888] hover:text-[#c8922a] transition-colors text-xs uppercase tracking-widest"
          >
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {products.slice(0, 6).map((product, i) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} priority={i < 3} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
