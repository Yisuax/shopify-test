import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { searchProducts } from '@/lib/shopify'
import ProductGrid from '@/components/product/ProductGrid'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

export const metadata: Metadata = {
  title: 'Search Products',
  description: 'Search the Viking Chrome Shop catalog.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

async function SearchResults({ query }: { query: string }) {
  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <Search className="h-12 w-12 text-[#333]" />
        <p className="text-[#555] text-sm uppercase tracking-widest">
          Enter a search term above
        </p>
      </div>
    )
  }

  const products = await searchProducts(query)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <Search className="h-12 w-12 text-[#333]" />
        <p className="text-white font-display text-2xl tracking-wide">NO RESULTS</p>
        <p className="text-[#555] text-sm">
          No products found for &quot;{query}&quot;
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[#555] text-xs uppercase tracking-widest">
        {products.length} {products.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
      </p>
      <ProductGrid products={products} columns={3} />
    </div>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = '' } = await searchParams

  return (
    <div className="pt-16 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#c8922a]" />
            <span className="text-[#c8922a] text-[10px] uppercase tracking-[0.4em]">
              Search
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white tracking-wide mb-6">
            FIND PRODUCTS
          </h1>

          {/* Search form */}
          <form method="GET" action="/search">
            <div className="flex max-w-xl">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search chrome stacks, LED bars..."
                className="flex-1 bg-[#141414] border border-[#2a2a2a] text-white placeholder-[#444] px-4 py-3 text-sm focus:outline-none focus:border-[#c8922a] transition-colors"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-[#c8922a] text-black px-5 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#e0a830] transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Suspense fallback={<ProductGridSkeleton count={6} />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
