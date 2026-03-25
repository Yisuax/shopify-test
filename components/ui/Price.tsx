interface PriceProps {
  amount: string
  currencyCode?: string
  className?: string
  compareAtAmount?: string | null
}

export function formatPrice(amount: string, currencyCode = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount))
}

export default function Price({
  amount,
  currencyCode = 'USD',
  className = '',
  compareAtAmount,
}: PriceProps) {
  const isOnSale =
    compareAtAmount &&
    parseFloat(compareAtAmount) > parseFloat(amount)

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-bold text-white">{formatPrice(amount, currencyCode)}</span>
      {isOnSale && (
        <span className="text-[#666] line-through text-sm">
          {formatPrice(compareAtAmount!, currencyCode)}
        </span>
      )}
    </span>
  )
}
