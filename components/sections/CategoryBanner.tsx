'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CategoryBanner() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-[#080808] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
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

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-auto md:h-[620px]">

          {/* Left — Chrome Accessories (full height, col 1-6) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 relative"
          >
            <Link
              href="/collections/chrome-accessories"
              className="group relative flex h-[380px] md:h-full overflow-hidden bg-[#141414]"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618048-fbd710b2b79e?w=800&q=80"
                alt="Chrome Accessories"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Gold vertical accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#c8922a] translate-x-[-3px] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="text-[#c8922a] font-['Barlow_Condensed'] text-[10px] tracking-[0.4em] uppercase font-bold">
                  01
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide mt-1 mb-2">
                  CHROME<br />ACCESSORIES
                </h3>
                <p className="text-[#888] text-xs leading-relaxed mb-4 max-w-[260px]">
                  Mirrors, grille guards, bug deflectors &amp; more
                </p>
                <div className="flex items-center gap-0 overflow-hidden">
                  <span className="font-['Barlow_Condensed'] text-[#c8922a] text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    SHOP NOW
                  </span>
                  <div className="h-px bg-[#c8922a] w-0 group-hover:w-24 transition-all duration-500 ease-out ml-2" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right — LED + Exhaust stacked (col 7-12) */}
          <div className="md:col-span-6 grid grid-rows-2 gap-3 h-[500px] md:h-full">

            {/* LED Lighting (top) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Link
                href="/collections/led-lighting"
                className="group relative flex h-full overflow-hidden bg-[#141414]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
                  alt="LED Lighting"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Corner bracket top-right */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-5 h-5 border-t-2 border-r-2 border-[#c8922a]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[#c8922a] font-['Barlow_Condensed'] text-[10px] tracking-[0.4em] uppercase font-bold">
                    02
                  </span>
                  <h3 className="font-display text-2xl text-white tracking-wide mt-0.5 mb-1">
                    LED LIGHTING
                  </h3>
                  <div className="flex items-center gap-0 overflow-hidden">
                    <span className="font-['Barlow_Condensed'] text-[#c8922a] text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      SHOP NOW
                    </span>
                    <div className="h-px bg-[#c8922a] w-0 group-hover:w-16 transition-all duration-500 ease-out ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Exhaust Systems (bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <Link
                href="/collections/exhaust-systems"
                className="group relative flex h-full overflow-hidden bg-[#141414]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Exhaust Systems"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Corner bracket bottom-left */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-5 h-5 border-b-2 border-l-2 border-[#c8922a]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[#c8922a] font-['Barlow_Condensed'] text-[10px] tracking-[0.4em] uppercase font-bold">
                    03
                  </span>
                  <h3 className="font-display text-2xl text-white tracking-wide mt-0.5 mb-1">
                    EXHAUST SYSTEMS
                  </h3>
                  <div className="flex items-center gap-0 overflow-hidden">
                    <span className="font-['Barlow_Condensed'] text-[#c8922a] text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      SHOP NOW
                    </span>
                    <div className="h-px bg-[#c8922a] w-0 group-hover:w-16 transition-all duration-500 ease-out ml-2" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
