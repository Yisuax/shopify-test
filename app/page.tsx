import { Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import CategoryBanner from '@/components/sections/CategoryBanner'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import { getFeaturedProducts } from '@/lib/shopify'

async function FeaturedProductsSection() {
  const products = await getFeaturedProducts()
  return (
    <FeaturedProducts
      products={products}
      title="Featured Products"
      subtitle="Hand-picked for the serious trucker"
    />
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense
        fallback={
          <section className="py-16 sm:py-24 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <ProductGridSkeleton count={6} />
            </div>
          </section>
        }
      >
        <FeaturedProductsSection />
      </Suspense>

      <CategoryBanner />
    </>
  )
}
