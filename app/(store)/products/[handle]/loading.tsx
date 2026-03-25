export default function ProductLoading() {
  return (
    <div className="pt-20 min-h-screen bg-[#131313]">
      <div className="max-w-[1280px] mx-auto px-8 py-12">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          {[80, 40, 60, 40, 120].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-[#2A2A2A] animate-pulse"
              style={{ width: `${w}px` }}
            />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square bg-[#0E0E0E] animate-pulse" />
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="aspect-square bg-[#2A2A2A] animate-pulse" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="h-3 bg-[#2A2A2A] w-32 animate-pulse" />
            <div className="h-12 bg-[#2A2A2A] w-full animate-pulse" />
            <div className="h-12 bg-[#2A2A2A] w-3/4 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-4 bg-[#2A2A2A] w-24 animate-pulse" />
              <div className="h-6 bg-[#2A2A2A] w-20 animate-pulse" />
            </div>
            <div className="h-10 bg-[#2A2A2A] w-36 animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-[#2A2A2A] w-24 animate-pulse" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 bg-[#2A2A2A] animate-pulse" />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-36 h-14 bg-[#2A2A2A] animate-pulse" />
              <div className="flex-1 h-14 bg-[#2A2A2A] animate-pulse" />
            </div>
            <div className="h-14 bg-[#2A2A2A] w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
