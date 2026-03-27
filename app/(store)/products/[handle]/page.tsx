import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProduct, getProductRecommendations, getProducts } from '@/lib/shopify'
import ProductDetailClient from './ProductDetailClient'
import { formatPrice } from '@/components/ui/Price'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  const { products } = await getProducts(50).catch(() => ({ products: [] }))
  return products.map((p) => ({ handle: p.handle }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, alt: product.featuredImage.altText ?? product.title }]
        : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params

  const product = await getProduct(handle)

  if (!product) notFound()

  const recommendations = await getProductRecommendations(product.id).catch(() => [])

  const related = recommendations.filter((p) => p.handle !== handle).slice(0, 4)

  return (
    <div className="pt-20 min-h-screen bg-[#131313]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-8 pt-8 pb-0">
        <nav className="flex items-center gap-2 mb-8 text-[10px] tracking-[0.2em] font-['Barlow_Condensed'] uppercase text-[#9C8F7C]">
          <Link href="/" className="hover:text-[#F8BC51] transition-colors">HOME</Link>
          <svg className="w-3 h-3 text-[#504536]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/products" className="hover:text-[#F8BC51] transition-colors">SHOP</Link>
          {product.productType && (
            <>
              <svg className="w-3 h-3 text-[#504536]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="hover:text-[#F8BC51] cursor-pointer transition-colors uppercase">
                {product.productType}
              </span>
            </>
          )}
          <svg className="w-3 h-3 text-[#F8BC51]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-[#E5E2E1] truncate max-w-[200px] uppercase">{product.title}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <ProductDetailClient product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-32">
            <h2 className="font-['Bebas_Neue'] text-4xl tracking-tight text-[#E5E2E1] mb-12">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((relProduct) => {
                const firstVariant = relProduct.variants.edges[0]?.node
                const isOnSale =
                  firstVariant?.compareAtPrice &&
                  parseFloat(firstVariant.compareAtPrice.amount) > parseFloat(firstVariant.price.amount)
                const isNew = relProduct.tags.includes('new')

                return (
                  <Link
                    key={relProduct.id}
                    href={`/products/${relProduct.handle}`}
                    className="group bg-[#1C1B1B] border-t border-transparent hover:border-[#F8BC51] transition-all duration-300 block"
                  >
                    <div className="aspect-square bg-[#2A2A2A] overflow-hidden relative">
                      {relProduct.featuredImage ? (
                        <Image
                          src={relProduct.featuredImage.url}
                          alt={relProduct.featuredImage.altText ?? relProduct.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#504536]">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="1" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                      {isNew && (
                        <div className="absolute top-4 left-4 bg-[#C6C6CA] text-[#2F3034] text-[10px] font-bold px-2 py-1 uppercase font-['Barlow_Condensed'] tracking-widest">
                          NEW
                        </div>
                      )}
                      {isOnSale && !isNew && (
                        <div className="absolute top-4 left-4 bg-[#F8BC51] text-[#422C00] text-[10px] font-bold px-2 py-1 uppercase font-['Barlow_Condensed'] tracking-widest">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="font-['Barlow_Condensed'] text-[10px] text-[#9C8F7C] tracking-widest mb-1 uppercase">
                        {relProduct.productType || relProduct.vendor || 'ACCESSORIES'}
                      </p>
                      <h3 className="font-['Bebas_Neue'] text-xl text-[#E5E2E1] group-hover:text-[#F8BC51] transition-colors">
                        {relProduct.title}
                      </h3>
                      <p className="font-['Bebas_Neue'] text-lg text-[#F8BC51] mt-2">
                        {formatPrice(
                          relProduct.priceRange.minVariantPrice.amount,
                          relProduct.priceRange.minVariantPrice.currencyCode
                        )}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
