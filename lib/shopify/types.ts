export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: {
    amount: string
    currencyCode: string
  }
  compareAtPrice: {
    amount: string
    currencyCode: string
  } | null
  selectedOptions: {
    name: string
    value: string
  }[]
  image?: ShopifyImage
}

export interface ShopifyProductOption {
  id: string
  name: string
  values: string[]
}

export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  vendor: string
  productType: string
  featuredImage: ShopifyImage | null
  images: {
    edges: { node: ShopifyImage }[]
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    edges: { node: ShopifyProductVariant }[]
  }
  options: ShopifyProductOption[]
  seo: {
    title: string
    description: string
  }
}

export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: { node: ShopifyProduct }[]
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    product: {
      id: string
      title: string
      handle: string
      featuredImage: ShopifyImage | null
    }
    selectedOptions: {
      name: string
      value: string
    }[]
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount: {
      amount: string
      currencyCode: string
    } | null
  }
  lines: {
    edges: { node: ShopifyCartLine }[]
  }
}

export interface ShopifyPage {
  id: string
  title: string
  handle: string
  body: string
  bodySummary: string
  createdAt: string
  updatedAt: string
  seo: {
    title: string
    description: string
  }
}

export type CartItem = {
  id: string
  quantity: number
  merchandiseId: string
  title: string
  variantTitle: string
  price: string
  currencyCode: string
  handle: string
  image: ShopifyImage | null
  selectedOptions: { name: string; value: string }[]
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  totalAmount: string
  subtotalAmount: string
  taxAmount: string
  currencyCode: string
  items: CartItem[]
}
