type BadgeVariant = 'default' | 'sale' | 'new' | 'outOfStock' | 'featured'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#1a1a1a] text-white border border-[#333]',
  sale: 'bg-[#c8922a] text-black',
  new: 'bg-white text-black',
  outOfStock: 'bg-[#333] text-[#888]',
  featured: 'bg-[#c8922a]/20 text-[#c8922a] border border-[#c8922a]/40',
}

export default function Badge({
  variant = 'default',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
