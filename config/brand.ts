export const brand = {
  name: process.env.NEXT_PUBLIC_STORE_NAME ?? 'Viking Chrome Shop',
  tagline: process.env.NEXT_PUBLIC_STORE_TAGLINE ?? 'Built for the Road. Forged for the Legend.',
  primaryColor: '#0a0a0a',
  accentColor: '#c8922a',
  secondaryColor: '#1a1a1a',
  fontDisplay: 'Bebas Neue',
  fontBody: 'Barlow',
  logoText: true,
  socialLinks: {
    instagram: 'https://instagram.com/vikingchromeshop',
    facebook: 'https://facebook.com/vikingchromeshop',
    youtube: 'https://youtube.com/vikingchromeshop',
  },
  currency: 'USD',
  locale: 'en-US',
  contactEmail: 'info@vikingchromeshop.com',
  phone: '1-800-VIKING-1',
}
