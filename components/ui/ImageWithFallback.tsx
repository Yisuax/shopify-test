'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className = '',
  priority = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={`bg-[#1a1a1a] flex items-center justify-center ${fill ? 'absolute inset-0' : ''} ${className}`}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-[#444] text-xs uppercase tracking-widest">No Image</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
