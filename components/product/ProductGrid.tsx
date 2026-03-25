import type { ShopifyProduct } from '@/lib/shopify/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: ShopifyProduct[]
  columns?: 2 | 3 | 4
}

const colClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-[#555] text-sm uppercase tracking-widest">No products found</p>
      </div>
    )
  }

  return (
    <div className={`grid ${colClasses[columns]} gap-4 sm:gap-6`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  )
}
