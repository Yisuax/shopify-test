import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCollection, getCollections } from '@/lib/shopify'
import ProductGrid from '@/components/product/ProductGrid'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

interface CollectionPageProps {
  params: Promise<{ handle: string }>
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params
  const collection = await getCollection(handle)

  if (!collection) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: collection.title,
    description: collection.description || `Shop ${collection.title} at Viking Chrome Shop.`,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: collection.image ? [{ url: collection.image.url }] : [],
    },
  }
}

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((c) => ({ handle: c.handle }))
}

async function CollectionProducts({ handle }: { handle: string }) {
  const collection = await getCollection(handle)
  if (!collection) notFound()

  const products = collection.products.edges.map((e) => e.node)

  return (
    <>
      {/* Collection header */}
      <div className="border-b border-[#1a1a1a] bg-[#080808] mb-10">
        <div className="py-12 px-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-[#c8922a]" />
            <span className="text-[#c8922a] text-[10px] uppercase tracking-[0.4em]">
              Collection
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl text-white tracking-wide">
            {collection.title.toUpperCase()}
          </h1>
          {collection.description && (
            <p className="text-[#666] text-sm mt-3 max-w-lg leading-relaxed">
              {collection.description}
            </p>
          )}
          <p className="text-[#444] text-xs mt-2 uppercase tracking-widest">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      <ProductGrid products={products} columns={3} />
    </>
  )
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params

  return (
    <div className="pt-16 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Suspense
          fallback={
            <>
              <div className="border-b border-[#1a1a1a] bg-[#080808] mb-10 py-12">
                <div className="h-14 w-64 bg-[#1a1a1a] animate-pulse" />
              </div>
              <ProductGridSkeleton count={9} />
            </>
          }
        >
          <CollectionProducts handle={handle} />
        </Suspense>
      </div>
    </div>
  )
}
