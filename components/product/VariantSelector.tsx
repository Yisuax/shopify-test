'use client'

import type { ShopifyProductOption, ShopifyProductVariant } from '@/lib/shopify/types'

interface VariantSelectorProps {
  options: ShopifyProductOption[]
  variants: ShopifyProductVariant[]
  selectedVariantId: string
  onSelect: (variantId: string) => void
}

export default function VariantSelector({
  options,
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  const selectedVariant = variants.find((v) => v.id === selectedVariantId)

  function handleOptionChange(optionName: string, value: string) {
    // Find variant that matches all currently selected options, except the one being changed
    const currentOptions = selectedVariant?.selectedOptions ?? []
    const newOptions = currentOptions.map((opt) =>
      opt.name === optionName ? { ...opt, value } : opt
    )

    const match = variants.find((v) =>
      v.selectedOptions.every((opt) =>
        newOptions.some((no) => no.name === opt.name && no.value === opt.value)
      )
    )

    if (match) onSelect(match.id)
  }

  // If only one option with value "Default Title", skip rendering
  if (
    options.length === 1 &&
    options[0].name === 'Title' &&
    options[0].values.length === 1 &&
    options[0].values[0] === 'Default Title'
  ) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => {
        const selectedValue = selectedVariant?.selectedOptions.find(
          (o) => o.name === option.name
        )?.value

        return (
          <div key={option.id} className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-[#888]">
              {option.name}:{' '}
              <span className="text-white">{selectedValue}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selectedValue === value
                const variantForValue = variants.find((v) =>
                  v.selectedOptions.some(
                    (opt) => opt.name === option.name && opt.value === value
                  )
                )
                const isAvailable = variantForValue?.availableForSale ?? false

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-150 ${
                      isSelected
                        ? 'border-[#c8922a] bg-[#c8922a]/10 text-[#c8922a]'
                        : isAvailable
                        ? 'border-[#2a2a2a] text-[#aaa] hover:border-[#555] hover:text-white'
                        : 'border-[#1a1a1a] text-[#444] cursor-not-allowed line-through'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`${option.name}: ${value}${!isAvailable ? ' (out of stock)' : ''}`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
