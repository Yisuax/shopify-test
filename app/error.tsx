'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error.digest ?? error.message)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6 px-4">
      <AlertTriangle className="h-16 w-16 text-[#c8922a]" />
      <h1 className="font-display text-4xl text-white tracking-wide text-center">
        SOMETHING WENT WRONG
      </h1>
      <p className="text-[#666] text-sm text-center max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-[#c8922a] text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#e0a830] transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
