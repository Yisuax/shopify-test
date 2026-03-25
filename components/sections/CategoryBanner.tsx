'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

interface CategoryItem {
  title: string
  subtitle: string
  href: string
  image: string
}

const categories: CategoryItem[] = [
  {
    title: 'Exhaust Systems',
    subtitle: 'Straight stacks, turned-down kits, full systems',
    href: '/collections/exhaust-systems',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'LED Lighting',
    subtitle: 'Light bars, cab lights, headlight assemblies',
    href: '/collections/led-lighting',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  {
    title: 'Chrome Accessories',
    subtitle: 'Mirrors, grille guards, bug deflectors',
    href: '/collections/chrome-accessories',
    image: 'https://images.unsplash.com/photo-1558618048-fbd710b2b79e?w=800&q=80',
  },
  {
    title: 'Interior Upgrades',
    subtitle: 'Trim kits, shifter knobs, steering wheel covers',
    href: '/collections/interior',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
  },
]

export default function CategoryBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-[#c8922a]" />
            <span className="text-[#c8922a] text-[10px] uppercase tracking-[0.4em]">
              Browse by category
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
            SHOP COLLECTIONS
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[3/4] overflow-hidden bg-[#141414]"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-white tracking-wide mb-1">
                    {cat.title.toUpperCase()}
                  </h3>
                  <p className="text-[#888] text-xs leading-relaxed mb-3">{cat.subtitle}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#c8922a] text-xs uppercase tracking-widest font-medium group-hover:gap-3 transition-all duration-200">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 border border-[#c8922a]/0 group-hover:border-[#c8922a]/40 transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
