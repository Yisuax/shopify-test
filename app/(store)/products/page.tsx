import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/shopify'
import ShopFilters from './ShopFilters'
import ShopProductGrid from './ShopProductGrid'
import ShopBannerSection from './ShopBannerSection'
import type { ShopifyProduct } from '@/lib/shopify/types'

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    'Browse our full catalog of premium chrome accessories, LED lighting, and exhaust systems for Class 8 trucks.',
}

const PAGE_SIZE = 12

interface ShopPageProps {
  searchParams: Promise<{
    page?: string
    sort?: string
    category?: string
    q?: string
    inStock?: string
    maxPrice?: string
    rating?: string
  }>
}

function sortProducts(products: ShopifyProduct[], sort: string): ShopifyProduct[] {
  switch (sort) {
    case 'price-asc':
      return [...products].sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      )
    case 'price-desc':
      return [...products].sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      )
    case 'popular':
      return [...products].sort((a, b) => (b.tags.includes('featured') ? 1 : -1))
    default:
      // newest — keep original order or sort by 'new' tag first
      return [...products].sort((a) => (a.tags.includes('new') ? -1 : 1))
  }
}

function filterProducts(
  products: ShopifyProduct[],
  {
    category,
    q,
    inStock,
    maxPrice,
    rating,
  }: {
    category?: string
    q?: string
    inStock?: string
    maxPrice?: string
    rating?: string
  }
): ShopifyProduct[] {
  return products.filter((p) => {
    if (
      category &&
      !p.tags.some((t) => t.toLowerCase().includes(category.replace('-', ' '))) &&
      p.productType.toLowerCase().replace(' ', '-') !== category
    ) {
      return false
    }
    if (q) {
      const search = q.toLowerCase()
      if (
        !p.title.toLowerCase().includes(search) &&
        !p.description.toLowerCase().includes(search) &&
        !p.tags.some((t) => t.toLowerCase().includes(search))
      ) {
        return false
      }
    }
    if (inStock === '1' && !p.availableForSale) return false
    if (maxPrice) {
      const max = parseFloat(maxPrice)
      if (parseFloat(p.priceRange.minVariantPrice.amount) > max) return false
    }
    return true
  })
}

async function ShopContent({ searchParams }: { searchParams: Awaited<ShopPageProps['searchParams']> }) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const sort = searchParams.sort ?? 'newest'

  // Fetch a large enough set to do client-side filtering
  const { products: allProducts } = await getProducts(100)

  const filtered = filterProducts(allProducts, {
    category: searchParams.category,
    q: searchParams.q,
    inStock: searchParams.inStock,
    maxPrice: searchParams.maxPrice,
    rating: searchParams.rating,
  })

  const sorted = sortProducts(filtered, sort)
  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageProducts = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <ShopProductGrid
      products={pageProducts}
      total={total}
      currentPage={safePage}
      totalPages={totalPages}
    />
  )
}

function ShopContentSkeleton() {
  return (
    <div className="flex-1 space-y-8">
      {/* Sort bar skeleton */}
      <div className="h-14 bg-[#1C1B1B] border-l-4 border-[#F8BC51] animate-pulse" />
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col bg-[#2A2A2A] animate-pulse">
            <div className="aspect-square bg-[#353534]" />
            <div className="p-6 space-y-3">
              <div className="h-3 bg-[#353534] w-1/3" />
              <div className="h-6 bg-[#353534] w-full" />
              <div className="h-6 bg-[#353534] w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--page-bg, #131313)' }}>
      <ShopBannerSection />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar — needs Suspense because it reads searchParams via useSearchParams hook */}
        <Suspense
          fallback={
            <aside className="w-full md:w-[280px] shrink-0 space-y-10 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-[#2A2A2A] w-1/2" />
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-8 bg-[#2A2A2A]" />
                    ))}
                  </div>
                </div>
              ))}
            </aside>
          }
        >
          <ShopFilters />
        </Suspense>

        {/* Products */}
        <Suspense fallback={<ShopContentSkeleton />}>
          <ShopContent searchParams={resolvedParams} />
        </Suspense>
      </div>
    </div>
  )
}
