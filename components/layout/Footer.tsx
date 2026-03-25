import Link from 'next/link'
import { brand } from '@/config/brand'

const navLinks = [
  { label: 'SHOP ALL', href: '/products' },
  { label: 'NEW ARRIVALS', href: '/products?sort=newest' },
  { label: 'CHROME EXTERIOR', href: '/collections/chrome-accessories' },
  { label: 'INTERIOR UPGRADES', href: '/collections/interior' },
]

const supportLinks = [
  { label: 'PRIVACY POLICY', href: '/pages/privacy' },
  { label: 'TERMS OF SERVICE', href: '/pages/terms' },
  { label: 'SHIPPING & RETURNS', href: '/pages/shipping' },
  { label: 'WHOLESALE', href: '/pages/wholesale' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] w-full mt-auto border-t border-[#504536]/15">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 sm:px-12 py-20 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/">
            <p className="font-['Bebas_Neue'] text-xl text-[#F8BC51] tracking-widest">
              VIKING CHROME SHOP
            </p>
          </Link>
          <p className="font-['Barlow'] text-xs text-[#9C8F7C] leading-loose">
            THE WORLD&apos;S PREMIER DESTINATION FOR CUSTOM TRUCK PARTS. MACHINED PRECISION.
            INDUSTRIAL LUXURY.
          </p>
          <div className="flex gap-4">
            {brand.socialLinks.facebook && (
              <a
                href={brand.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#504536]/30 flex items-center justify-center hover:bg-[#F8BC51] hover:text-[#422C00] transition-all text-[#9C8F7C]"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
            {brand.socialLinks.instagram && (
              <a
                href={brand.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#504536]/30 flex items-center justify-center hover:bg-[#F8BC51] hover:text-[#422C00] transition-all text-[#9C8F7C]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
            {brand.socialLinks.youtube && (
              <a
                href={brand.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#504536]/30 flex items-center justify-center hover:bg-[#F8BC51] hover:text-[#422C00] transition-all text-[#9C8F7C]"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0E0E0E" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] mb-8">
            NAVIGATION
          </h4>
          <ul className="space-y-4 font-['Barlow'] text-xs tracking-widest uppercase text-[#9C8F7C]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51] mb-8">
            SUPPORT
          </h4>
          <ul className="space-y-4 font-['Barlow'] text-xs tracking-widest uppercase text-[#9C8F7C]">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-8">
          <h4 className="font-['Barlow_Condensed'] text-sm font-bold tracking-widest text-[#F8BC51]">
            NEWSLETTER
          </h4>
          <p className="font-['Barlow'] text-[10px] text-[#9C8F7C] tracking-widest">
            JOIN THE ELITE. GET EXCLUSIVE RELEASES.
          </p>
          <form
            className="flex"
            action="#"
          >
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="bg-[#353534] border-none text-xs font-['Barlow'] tracking-widest px-4 py-3 flex-1 focus:outline-none focus:ring-1 focus:ring-[#F8BC51] text-[#E5E2E1] placeholder:text-[#9C8F7C]"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="bg-[#F8BC51] px-5 text-[#422C00] font-bold flex items-center justify-center hover:bg-[#C8922A] transition-colors"
              aria-label="Subscribe to newsletter"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 sm:px-12 py-8 border-t border-[#504536]/5 text-center max-w-[1920px] mx-auto">
        <p className="font-['Barlow'] text-[10px] tracking-[0.3em] uppercase text-[#9C8F7C]">
          &copy; {new Date().getFullYear()} VIKING CHROME SHOP. MACHINED PRECISION.
        </p>
      </div>
    </footer>
  )
}
