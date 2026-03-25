'use client'

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#c8922a] text-black font-semibold hover:bg-[#e0a830] active:bg-[#b07820] border border-[#c8922a] hover:border-[#e0a830]',
  secondary:
    'bg-[#1a1a1a] text-white font-semibold hover:bg-[#2a2a2a] active:bg-[#0f0f0f] border border-[#333]',
  ghost:
    'bg-transparent text-[#c8922a] font-semibold hover:bg-[#c8922a]/10 border border-transparent',
  outline:
    'bg-transparent text-white font-semibold hover:bg-white hover:text-black border border-white',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 tracking-wide transition-all duration-200 uppercase text-xs font-bold letter-spacing-widest cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-50 cursor-not-allowed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {children}
    </button>
  )
})

export default Button
