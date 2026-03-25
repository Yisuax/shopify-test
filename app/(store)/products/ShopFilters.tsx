'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

const CATEGORIES = [
  { label: 'CHROME EXTERIOR', value: 'chrome-exterior', count: 124 },
  { label: 'LIGHTING UPGRADES', value: 'lighting', count: 86 },
  { label: 'INTERIOR COMFORT', value: 'interior', count: 52 },
  { label: 'EXHAUST SYSTEMS', value: 'exhaust', count: 38 },
  { label: 'ACCESSORIES', value: 'accessories', count: 67 },
]

export default function ShopFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const selectedCategory = searchParams.get('category')
  const inStockOnly = searchParams.get('inStock') === '1'
  const minPrice = Number(searchParams.get('minPrice') ?? 0)
  const maxPrice = Number(searchParams.get('maxPrice') ?? 1000)
  const minRating = Number(searchParams.get('rating') ?? 0)

  // Local slider state (only commit on mouseup)
  const [localMax, setLocalMax] = useState(maxPrice)

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      // Reset page when filter changes
      params.delete('page')
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams]
  )

  function toggleCategory(value: string) {
    updateParam('category', selectedCategory === value ? null : value)
  }

  function toggleInStock() {
    updateParam('inStock', inStockOnly ? null : '1')
  }

  function commitMaxPrice(val: number) {
    updateParam('maxPrice', val === 1000 ? null : String(val))
  }

  return (
    <aside className="w-full md:w-[280px] shrink-0 space-y-10">
      {/* Search */}
      <div className="space-y-4">
        <h3 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] uppercase">
          SEARCH PRODUCTS
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="MODEL OR PART #"
            defaultValue={searchParams.get('q') ?? ''}
            onChange={(e) => {
              const val = e.target.value.trim()
              if (val.length === 0) updateParam('q', null)
              else if (val.length >= 2) updateParam('q', val)
            }}
            className="w-full bg-[#353534] border-none text-[#E5E2E1] font-['Barlow_Condensed'] tracking-wider focus:outline-none focus:ring-1 focus:ring-[#F8BC51] h-12 px-4 pr-10 placeholder:text-[#9C8F7C] text-sm"
            aria-label="Search products"
          />
          <svg className="absolute right-4 top-3.5 w-5 h-5 text-[#9C8F7C] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] uppercase">
          CATEGORIES
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map(({ label, value, count }) => {
            const isChecked = selectedCategory === value
            return (
              <label
                key={value}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'border-[#F8BC51] bg-[#F8BC51]/10'
                        : 'border-[#504536] bg-[#2A2A2A] group-hover:border-[#F8BC51]'
                    }`}
                    onClick={() => toggleCategory(value)}
                  >
                    {isChecked && (
                      <div className="w-2 h-2 bg-[#F8BC51]" />
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(value)}
                    className="sr-only"
                  />
                  <span
                    className={`font-['Barlow_Condensed'] text-sm tracking-wide transition-colors ${
                      isChecked
                        ? 'text-[#F8BC51]'
                        : 'text-[#E5E2E1] group-hover:text-[#F8BC51]'
                    }`}
                    onClick={() => toggleCategory(value)}
                  >
                    {label}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#9C8F7C]">{count}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <h3 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] uppercase">
          PRICE RANGE
        </h3>
        <div className="px-2">
          <div className="h-1 bg-[#2A2A2A] relative">
            <div
              className="absolute left-0 h-full bg-gradient-to-r from-[#F8BC51] to-[#C8922A]"
              style={{ right: `${100 - (localMax / 1000) * 100}%` }}
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F8BC51] border-2 border-[#422C00] rounded-full cursor-pointer" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F8BC51] border-2 border-[#422C00] rounded-full cursor-pointer"
              style={{ left: `calc(${(localMax / 1000) * 100}% - 8px)` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={25}
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            onMouseUp={(e) => commitMaxPrice(Number((e.target as HTMLInputElement).value))}
            onTouchEnd={(e) => commitMaxPrice(Number((e.target as HTMLInputElement).value))}
            className="w-full opacity-0 absolute"
            style={{ marginTop: '-1rem' }}
            aria-label="Maximum price"
          />
          <div className="flex justify-between mt-4 font-['Barlow_Condensed'] text-xs font-bold text-[#E5E2E1]">
            <span>$0</span>
            <span className="text-[#F8BC51]">${localMax}</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="flex items-center justify-between p-4 bg-[#1C1B1B]">
        <span className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#E5E2E1]">
          IN-STOCK ONLY
        </span>
        <button
          onClick={toggleInStock}
          className={`w-10 h-5 relative rounded-full p-1 transition-colors ${
            inStockOnly ? 'bg-[#F8BC51]' : 'bg-[#2A2A2A]'
          }`}
          aria-label={inStockOnly ? 'Show all products' : 'Show in-stock only'}
          role="switch"
          aria-checked={inStockOnly}
        >
          <div
            className={`w-3 h-3 bg-[#422C00] rounded-full transition-transform ${
              inStockOnly ? 'translate-x-[18px]' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <h3 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] uppercase">
          RATING
        </h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => updateParam('rating', minRating === rating ? null : String(rating))}
              className="flex items-center gap-2 group w-full"
              aria-label={`Filter by ${rating}+ stars`}
            >
              <div className="flex text-[#F8BC51]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? 'text-[#F8BC51]' : 'text-[#504536]'}`}
                    fill={i < rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className={`font-['Barlow_Condensed'] text-xs transition-colors ${
                minRating === rating ? 'text-[#F8BC51] font-bold' : 'text-[#9C8F7C] group-hover:text-[#E5E2E1]'
              }`}>
                &amp; UP
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
