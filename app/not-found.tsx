import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 px-4 text-center">
      {/* Big 404 */}
      <span className="font-display text-[120px] sm:text-[180px] leading-none text-[#111] select-none">
        404
      </span>

      <div className="flex flex-col gap-3 -mt-6">
        <h1 className="font-display text-3xl sm:text-5xl text-white tracking-wide">
          PAGE NOT FOUND
        </h1>
        <p className="text-[#555] text-sm max-w-sm mx-auto">
          The road you were looking for doesn&apos;t exist. Check your route and try again.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#c8922a] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#e0a830] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Go Home
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#aaa] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:border-white hover:text-white transition-colors"
        >
          Shop All
        </Link>
      </div>
    </div>
  )
}
