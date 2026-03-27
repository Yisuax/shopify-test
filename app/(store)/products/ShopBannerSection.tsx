'use client'

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'

export default function ShopBannerSection() {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section
      className="shop-banner relative w-full flex items-center justify-center overflow-hidden"
      style={{
        background: isLight
          ? 'linear-gradient(to bottom, #E4E0DA 0%, #EFEDE8 100%)'
          : 'linear-gradient(to bottom, #1a1816 0%, #131313 100%)',
        paddingTop: '60px',
        paddingBottom: '60px',
        marginTop: '-110px',
      }}
    >
      <div className="relative z-10 text-center px-4">
        <nav className="flex justify-center items-center gap-2 mb-4 font-['Barlow_Condensed'] text-xs tracking-widest"
          style={{ color: isLight ? '#78716C' : '#9C8F7C' }}
        >
          <Link href="/" className="hover:text-[#F8BC51] transition-colors">
            HOME
          </Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            style={{ color: isLight ? '#A09690' : '#504536' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-[#F8BC51]">SHOP ALL PRODUCTS</span>
        </nav>
        <h1
          className="font-['Bebas_Neue'] text-7xl md:text-9xl tracking-tighter leading-none"
          style={{ color: isLight ? '#1C1917' : '#E5E2E1' }}
        >
          SHOP ALL PRODUCTS
        </h1>
        <p className="font-['Barlow_Condensed'] text-[#F8BC51] tracking-[0.3em] mt-4 font-bold uppercase">
          Industrial Grade Precision
        </p>
      </div>
    </section>
  )
}
