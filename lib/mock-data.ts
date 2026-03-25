import type { ShopifyProduct, ShopifyCollection } from './shopify/types'

const makeImage = (
  url: string,
  altText: string,
  width = 800,
  height = 800
) => ({ url, altText, width, height })

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const mockProducts: ShopifyProduct[] = [
  // ── Chrome Exhaust Stacks ────────────────────────────────────────────────
  {
    id: 'gid://shopify/Product/1001',
    title: 'Viking 7" Straight Chrome Exhaust Stack',
    handle: 'viking-7-straight-chrome-exhaust-stack',
    description:
      'Dominate the road with our 7-inch straight chrome exhaust stack. Precision-formed T304 stainless steel with a mirror-polished finish that holds up to years of highway miles.',
    descriptionHtml:
      '<p>Dominate the road with our 7-inch straight chrome exhaust stack. Precision-formed T304 stainless steel with a mirror-polished finish that holds up to years of highway miles.</p><ul><li>T304 stainless steel</li><li>Mirror-chrome finish</li><li>Universal 5" inlet</li><li>Includes mounting hardware</li></ul>',
    availableForSale: true,
    tags: ['exhaust', 'chrome', 'stack', 'new'],
    vendor: 'Viking Chrome',
    productType: 'Exhaust',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'Viking 7" Chrome Exhaust Stack'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Chrome Exhaust Stack front') },
        { node: makeImage('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80', 'Chrome Exhaust Stack side') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '189.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '219.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/10011',
            title: '5ft',
            availableForSale: true,
            price: { amount: '189.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '249.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Length', value: '5ft' }],
            image: makeImage('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 'Chrome Exhaust Stack 5ft'),
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/10012',
            title: '6ft',
            availableForSale: true,
            price: { amount: '209.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Length', value: '6ft' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/10013',
            title: '7ft',
            availableForSale: true,
            price: { amount: '219.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Length', value: '7ft' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/10014',
            title: '8ft',
            availableForSale: false,
            price: { amount: '229.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Length', value: '8ft' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-1001-1', name: 'Length', values: ['5ft', '6ft', '7ft', '8ft'] }],
    seo: { title: 'Viking 7" Straight Chrome Exhaust Stack', description: 'Premium T304 stainless chrome exhaust stack.' },
  },
  {
    id: 'gid://shopify/Product/1002',
    title: 'Viking Turned-Down Chrome Stack Kit',
    handle: 'viking-turned-down-chrome-stack-kit',
    description:
      'Classic turned-down tip directs exhaust gases safely away from trailers and cargo. Available in polished chrome or brushed satin finish.',
    descriptionHtml:
      '<p>Classic turned-down tip directs exhaust gases safely away from trailers and cargo.</p>',
    availableForSale: true,
    tags: ['exhaust', 'chrome', 'turned-down'],
    vendor: 'Viking Chrome',
    productType: 'Exhaust',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      'Turned Down Chrome Stack'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80', 'Turned Down Stack') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '159.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '179.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/10021',
            title: 'Polished Chrome',
            availableForSale: true,
            price: { amount: '159.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Finish', value: 'Polished Chrome' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/10022',
            title: 'Brushed Satin',
            availableForSale: true,
            price: { amount: '179.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Finish', value: 'Brushed Satin' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-1002-1', name: 'Finish', values: ['Polished Chrome', 'Brushed Satin'] }],
    seo: { title: 'Viking Turned-Down Chrome Stack Kit', description: 'Classic turned-down chrome exhaust stack.' },
  },
  {
    id: 'gid://shopify/Product/1003',
    title: 'Viking Peterbilt Chrome Exhaust System',
    handle: 'viking-peterbilt-chrome-exhaust-system',
    description:
      'Specifically engineered for Peterbilt 379/389 models. Includes dual chrome stacks, mounting brackets, and all hardware for a bolt-on installation.',
    descriptionHtml: '<p>Specifically engineered for Peterbilt 379/389 models.</p>',
    availableForSale: true,
    tags: ['exhaust', 'peterbilt', 'chrome', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Exhaust',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
      'Peterbilt Chrome Exhaust'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80', 'Peterbilt Exhaust') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '549.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '549.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/10031',
            title: 'Default',
            availableForSale: true,
            price: { amount: '549.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '699.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-1003-1', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Viking Peterbilt Chrome Exhaust System', description: 'Bolt-on chrome exhaust for Peterbilt 379/389.' },
  },
  {
    id: 'gid://shopify/Product/1004',
    title: 'Viking 5" Chrome Elbow Kit',
    handle: 'viking-5-chrome-elbow-kit',
    description:
      'Heavy-duty 90-degree chrome elbow for routing your exhaust around cab components. 16-gauge steel, chrome plated.',
    descriptionHtml: '<p>Heavy-duty 90-degree chrome elbow. 16-gauge steel, chrome plated.</p>',
    availableForSale: true,
    tags: ['exhaust', 'chrome', 'elbow'],
    vendor: 'Viking Chrome',
    productType: 'Exhaust',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      'Chrome Elbow Kit'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', 'Chrome Elbow') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '89.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/10041',
            title: 'Default',
            availableForSale: true,
            price: { amount: '89.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-1004-1', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Viking 5" Chrome Elbow Kit', description: '90-degree chrome exhaust elbow.' },
  },

  // ── LED Light Bars ───────────────────────────────────────────────────────
  {
    id: 'gid://shopify/Product/2001',
    title: 'Viking 50" Dual-Row LED Light Bar',
    handle: 'viking-50-dual-row-led-light-bar',
    description:
      '25,000 lumens of pure road-slicing light. IP68 waterproof, die-cast aluminum housing, polycarbonate lens. Combo flood/spot beam pattern.',
    descriptionHtml:
      '<p>25,000 lumens of pure road-slicing light.</p><ul><li>IP68 waterproof rating</li><li>Die-cast aluminum housing</li><li>Combo beam pattern</li><li>3-year warranty</li></ul>',
    availableForSale: true,
    tags: ['led', 'light-bar', 'lighting', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Lighting',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      'Viking LED Light Bar'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80', 'LED Light Bar') },
        { node: makeImage('https://images.unsplash.com/photo-1558618047-f4c5fb63c8b4?w=800&q=80', 'LED Light Bar installed') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '299.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '349.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/20011',
            title: 'Flood Beam',
            availableForSale: true,
            price: { amount: '299.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '399.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Beam Pattern', value: 'Flood Beam' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/20012',
            title: 'Spot Beam',
            availableForSale: true,
            price: { amount: '299.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Beam Pattern', value: 'Spot Beam' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/20013',
            title: 'Combo Beam',
            availableForSale: true,
            price: { amount: '349.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Beam Pattern', value: 'Combo Beam' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-2001-1', name: 'Beam Pattern', values: ['Flood Beam', 'Spot Beam', 'Combo Beam'] }],
    seo: { title: 'Viking 50" Dual-Row LED Light Bar', description: 'High-output 25,000 lumen LED light bar.' },
  },
  {
    id: 'gid://shopify/Product/2002',
    title: 'Viking Visor LED Cab Lights (5-Pack)',
    handle: 'viking-visor-led-cab-lights-5-pack',
    description:
      'Chrome-trimmed LED marker lights for the cab visor. Easy plug-and-play installation. Amber/clear lens options.',
    descriptionHtml: '<p>Chrome-trimmed LED marker lights. Plug-and-play installation.</p>',
    availableForSale: true,
    tags: ['led', 'cab-lights', 'marker', 'chrome'],
    vendor: 'Viking Chrome',
    productType: 'Lighting',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1611816055460-618287d870a3?w=800&q=80',
      'LED Cab Lights'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1611816055460-618287d870a3?w=800&q=80', 'Cab Lights') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '49.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '59.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/20021',
            title: 'Amber Lens',
            availableForSale: true,
            price: { amount: '49.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Lens Color', value: 'Amber Lens' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/20022',
            title: 'Clear Lens',
            availableForSale: true,
            price: { amount: '59.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Lens Color', value: 'Clear Lens' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-2002-1', name: 'Lens Color', values: ['Amber Lens', 'Clear Lens'] }],
    seo: { title: 'Viking Visor LED Cab Lights 5-Pack', description: 'Chrome LED cab marker lights.' },
  },
  {
    id: 'gid://shopify/Product/2003',
    title: 'Viking Headlight Assembly — Kenworth T680',
    handle: 'viking-headlight-assembly-kenworth-t680',
    description:
      'OEM-fit LED headlight assembly for the Kenworth T680. Projector beam design with integrated DRL. Plug-and-play, no modifications required.',
    descriptionHtml: '<p>OEM-fit LED headlight for Kenworth T680. Projector beam with DRL.</p>',
    availableForSale: true,
    tags: ['led', 'headlight', 'kenworth', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Lighting',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1513836279014-a89f7d3c7cbe?w=800&q=80',
      'Kenworth LED Headlight'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1513836279014-a89f7d3c7cbe?w=800&q=80', 'Headlight') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '449.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '449.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/20031',
            title: 'Driver Side',
            availableForSale: true,
            price: { amount: '449.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '599.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Side', value: 'Driver Side' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/20032',
            title: 'Passenger Side',
            availableForSale: true,
            price: { amount: '449.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Side', value: 'Passenger Side' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/20033',
            title: 'Pair',
            availableForSale: true,
            price: { amount: '849.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Side', value: 'Pair' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-2003-1', name: 'Side', values: ['Driver Side', 'Passenger Side', 'Pair'] }],
    seo: { title: 'Viking LED Headlight Assembly — Kenworth T680', description: 'OEM-fit LED headlight for Kenworth T680.' },
  },

  // ── Chrome Mirror Sets ───────────────────────────────────────────────────
  {
    id: 'gid://shopify/Product/3001',
    title: 'Viking Chrome Heated Mirror Set',
    handle: 'viking-chrome-heated-mirror-set',
    description:
      'Wide-angle heated mirrors with chrome housing. Integrated turn-signal light. Fits most Class 8 trucks. Sold as a pair.',
    descriptionHtml:
      '<p>Wide-angle heated mirrors with chrome housing. Integrated turn-signal light.</p>',
    availableForSale: true,
    tags: ['mirrors', 'chrome', 'heated', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Accessories',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1558618048-fbd710b2b79e?w=800&q=80',
      'Chrome Heated Mirrors'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1558618048-fbd710b2b79e?w=800&q=80', 'Chrome Mirrors') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '299.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '349.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/30011',
            title: 'Standard Chrome',
            availableForSale: true,
            price: { amount: '299.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Standard Chrome' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/30012',
            title: 'Wide Angle Chrome',
            availableForSale: true,
            price: { amount: '349.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Wide Angle Chrome' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-3001-1', name: 'Style', values: ['Standard Chrome', 'Wide Angle Chrome'] }],
    seo: { title: 'Viking Chrome Heated Mirror Set', description: 'Chrome heated mirrors for Class 8 trucks.' },
  },
  {
    id: 'gid://shopify/Product/3002',
    title: 'Viking Kenworth Chrome Mirror Arms',
    handle: 'viking-kenworth-chrome-mirror-arms',
    description:
      'Billet-chrome mirror arms for Kenworth T680/T880. Polished to a mirror finish. Sold as a pair. Includes all hardware.',
    descriptionHtml: '<p>Billet-chrome mirror arms for Kenworth T680/T880.</p>',
    availableForSale: true,
    tags: ['mirrors', 'chrome', 'kenworth'],
    vendor: 'Viking Chrome',
    productType: 'Accessories',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      'Kenworth Mirror Arms'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80', 'Mirror Arms') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '149.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '149.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/30021',
            title: 'Default',
            availableForSale: true,
            price: { amount: '149.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '199.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-3002-1', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Viking Kenworth Chrome Mirror Arms', description: 'Billet-chrome mirror arms for Kenworth.' },
  },

  // ── Interior Accessories ─────────────────────────────────────────────────
  {
    id: 'gid://shopify/Product/4001',
    title: 'Viking Chrome Shifter Knob — Peterbilt',
    handle: 'viking-chrome-shifter-knob-peterbilt',
    description:
      'Solid billet aluminum shifter knob with chrome finish. Threaded adapter fits most Peterbilt shifter columns. Available in ball or skull style.',
    descriptionHtml: '<p>Solid billet aluminum shifter knob. Ball or skull style available.</p>',
    availableForSale: true,
    tags: ['interior', 'chrome', 'shifter', 'peterbilt'],
    vendor: 'Viking Chrome',
    productType: 'Interior',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
      'Chrome Shifter Knob'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80', 'Shifter Knob') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '79.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/40011',
            title: 'Ball Style',
            availableForSale: true,
            price: { amount: '79.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Ball Style' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/40012',
            title: 'Skull Style',
            availableForSale: true,
            price: { amount: '89.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Skull Style' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-4001-1', name: 'Style', values: ['Ball Style', 'Skull Style'] }],
    seo: { title: 'Viking Chrome Shifter Knob — Peterbilt', description: 'Billet chrome shifter knob for Peterbilt.' },
  },
  {
    id: 'gid://shopify/Product/4002',
    title: 'Viking Dashboard Chrome Trim Kit',
    handle: 'viking-dashboard-chrome-trim-kit',
    description:
      'Full dashboard trim kit in chrome-finish ABS. Covers gauge cluster bezel, center console, and door panels. Vehicle-specific fitment.',
    descriptionHtml: '<p>Chrome dashboard trim kit. Vehicle-specific fitment.</p>',
    availableForSale: true,
    tags: ['interior', 'chrome', 'trim', 'dashboard', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Interior',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80',
      'Dashboard Chrome Trim Kit'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=800&q=80', 'Dash Trim') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '129.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '149.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/40021',
            title: 'Peterbilt 389',
            availableForSale: true,
            price: { amount: '129.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Fitment', value: 'Peterbilt 389' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/40022',
            title: 'Kenworth W900',
            availableForSale: true,
            price: { amount: '129.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Fitment', value: 'Kenworth W900' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/40023',
            title: 'Freightliner Cascadia',
            availableForSale: true,
            price: { amount: '149.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Fitment', value: 'Freightliner Cascadia' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-4002-1', name: 'Fitment', values: ['Peterbilt 389', 'Kenworth W900', 'Freightliner Cascadia'] }],
    seo: { title: 'Viking Dashboard Chrome Trim Kit', description: 'Chrome dashboard trim kit for semi trucks.' },
  },
  {
    id: 'gid://shopify/Product/4003',
    title: 'Viking Steering Wheel Chrome Horn Cover',
    handle: 'viking-steering-wheel-chrome-horn-cover',
    description:
      'Chrome-plated horn button cover. Universal fit for most OEM steering wheels. Easy snap-on installation.',
    descriptionHtml: '<p>Chrome horn button cover. Universal fit. Easy snap-on installation.</p>',
    availableForSale: true,
    tags: ['interior', 'chrome', 'steering-wheel'],
    vendor: 'Viking Chrome',
    productType: 'Interior',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      'Chrome Horn Cover'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80', 'Horn Cover') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '39.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '39.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/40031',
            title: 'Default',
            availableForSale: true,
            price: { amount: '39.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-4003-1', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Viking Steering Wheel Chrome Horn Cover', description: 'Universal chrome horn button cover.' },
  },

  // ── Chrome Grille Guards ─────────────────────────────────────────────────
  {
    id: 'gid://shopify/Product/5001',
    title: 'Viking Heavy-Duty Chrome Grille Guard',
    handle: 'viking-heavy-duty-chrome-grille-guard',
    description:
      '3/16" steel tube construction, polished chrome finish. Direct-bolt fitment for Peterbilt 389 and 379. Protects front fascia without blocking airflow.',
    descriptionHtml:
      '<p>3/16" steel tube construction with polished chrome. Direct-bolt for Peterbilt 389/379.</p>',
    availableForSale: true,
    tags: ['grille-guard', 'chrome', 'peterbilt', 'featured'],
    vendor: 'Viking Chrome',
    productType: 'Exterior',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1504222490345-c075b7c6cfe7?w=800&q=80',
      'Chrome Grille Guard'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1504222490345-c075b7c6cfe7?w=800&q=80', 'Grille Guard front') },
        { node: makeImage('https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800&q=80', 'Grille Guard angle') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '799.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '899.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/50011',
            title: 'Peterbilt 389',
            availableForSale: true,
            price: { amount: '799.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '999.99', currencyCode: 'USD' },
            selectedOptions: [{ name: 'Fitment', value: 'Peterbilt 389' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/50012',
            title: 'Peterbilt 379',
            availableForSale: true,
            price: { amount: '799.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Fitment', value: 'Peterbilt 379' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/50013',
            title: 'Kenworth W900',
            availableForSale: true,
            price: { amount: '899.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Fitment', value: 'Kenworth W900' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-5001-1', name: 'Fitment', values: ['Peterbilt 389', 'Peterbilt 379', 'Kenworth W900'] }],
    seo: { title: 'Viking Heavy-Duty Chrome Grille Guard', description: 'Chrome grille guard for Peterbilt and Kenworth.' },
  },
  {
    id: 'gid://shopify/Product/5002',
    title: 'Viking Bug Deflector — Chrome Billet',
    handle: 'viking-bug-deflector-chrome-billet',
    description:
      'Precision CNC-machined billet aluminum bug deflector. Protects paint and windshield. Polished chrome finish with laser-engraved Viking logo.',
    descriptionHtml: '<p>CNC-machined billet aluminum bug deflector with chrome finish. Laser-engraved Viking logo.</p>',
    availableForSale: true,
    tags: ['exterior', 'chrome', 'bug-deflector'],
    vendor: 'Viking Chrome',
    productType: 'Exterior',
    featuredImage: makeImage(
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80',
      'Chrome Bug Deflector'
    ),
    images: {
      edges: [
        { node: makeImage('https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80', 'Bug Deflector') },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: '119.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '139.99', currencyCode: 'USD' },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/50021',
            title: 'Standard',
            availableForSale: true,
            price: { amount: '119.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Standard' }],
          },
        },
        {
          node: {
            id: 'gid://shopify/ProductVariant/50022',
            title: 'Low Profile',
            availableForSale: true,
            price: { amount: '139.99', currencyCode: 'USD' },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Style', value: 'Low Profile' }],
          },
        },
      ],
    },
    options: [{ id: 'opt-5002-1', name: 'Style', values: ['Standard', 'Low Profile'] }],
    seo: { title: 'Viking Bug Deflector — Chrome Billet', description: 'Billet chrome bug deflector with Viking logo.' },
  },
]

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

const allProducts = mockProducts

const chromeAccessories = mockProducts.filter((p) =>
  p.tags.includes('chrome') && !p.tags.includes('exhaust') && !p.tags.includes('led')
)

const ledLighting = mockProducts.filter((p) => p.tags.includes('led'))

const exhaustSystems = mockProducts.filter((p) => p.tags.includes('exhaust'))

const interior = mockProducts.filter((p) => p.productType === 'Interior')

export const mockCollections: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    title: 'All Products',
    handle: 'all',
    description: 'The full Viking Chrome Shop catalog — every product we make for the road.',
    image: makeImage(
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
      'All Products'
    ),
    products: { edges: allProducts.map((node) => ({ node })) },
  },
  {
    id: 'gid://shopify/Collection/2',
    title: 'Chrome Accessories',
    handle: 'chrome-accessories',
    description: 'Mirrors, grille guards, trim kits, and every chrome accent your rig deserves.',
    image: makeImage(
      'https://images.unsplash.com/photo-1558618048-fbd710b2b79e?w=1200&q=80',
      'Chrome Accessories'
    ),
    products: { edges: chromeAccessories.map((node) => ({ node })) },
  },
  {
    id: 'gid://shopify/Collection/3',
    title: 'LED Lighting',
    handle: 'led-lighting',
    description: 'High-output LED light bars, cab lights, and headlight assemblies.',
    image: makeImage(
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80',
      'LED Lighting'
    ),
    products: { edges: ledLighting.map((node) => ({ node })) },
  },
  {
    id: 'gid://shopify/Collection/4',
    title: 'Exhaust Systems',
    handle: 'exhaust-systems',
    description: 'Chrome stacks, elbow kits, and full exhaust systems for Class 8 trucks.',
    image: makeImage(
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'Exhaust Systems'
    ),
    products: { edges: exhaustSystems.map((node) => ({ node })) },
  },
  {
    id: 'gid://shopify/Collection/5',
    title: 'Interior',
    handle: 'interior',
    description: 'Shifter knobs, dash trim kits, horn covers, and premium interior upgrades.',
    image: makeImage(
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80',
      'Interior Accessories'
    ),
    products: { edges: interior.map((node) => ({ node })) },
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getMockProduct(handle: string): ShopifyProduct | null {
  return mockProducts.find((p) => p.handle === handle) ?? null
}

export function getMockProducts(first = 12): ShopifyProduct[] {
  return mockProducts.slice(0, first)
}

export function getMockCollection(handle: string): ShopifyCollection | null {
  return mockCollections.find((c) => c.handle === handle) ?? null
}

export function getMockCollections(): ShopifyCollection[] {
  return mockCollections
}

export function searchMockProducts(query: string): ShopifyProduct[] {
  const q = query.toLowerCase()
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  )
}

export function getMockFeaturedProducts(): ShopifyProduct[] {
  return mockProducts.filter((p) => p.tags.includes('featured'))
}
