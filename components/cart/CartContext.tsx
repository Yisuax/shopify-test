'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import type { Cart, CartItem } from '@/lib/shopify/types'
import {
  getCartAction,
  addToCartAction,
  updateCartAction,
  removeFromCartAction,
} from '@/app/actions/cart'

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

interface CartState {
  cart: Cart | null
  isLoading: boolean
  isOpen: boolean
  error: string | null
}

type CartAction =
  | { type: 'SET_CART'; cart: Cart | null }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_OPEN'; open: boolean }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'OPTIMISTIC_ADD'; item: CartItem }
  | { type: 'OPTIMISTIC_REMOVE'; lineId: string }
  | { type: 'OPTIMISTIC_UPDATE'; lineId: string; quantity: number }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.cart, error: null }
    case 'SET_LOADING':
      return { ...state, isLoading: action.loading }
    case 'SET_OPEN':
      return { ...state, isOpen: action.open }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'OPTIMISTIC_ADD': {
      if (!state.cart) {
        const newCart: Cart = {
          id: 'optimistic',
          checkoutUrl: '#',
          totalQuantity: action.item.quantity,
          totalAmount: (parseFloat(action.item.price) * action.item.quantity).toFixed(2),
          subtotalAmount: (parseFloat(action.item.price) * action.item.quantity).toFixed(2),
          taxAmount: '0.00',
          currencyCode: action.item.currencyCode,
          items: [action.item],
        }
        return { ...state, cart: newCart }
      }
      const existing = state.cart.items.find((i) => i.merchandiseId === action.item.merchandiseId)
      const items = existing
        ? state.cart.items.map((i) =>
            i.merchandiseId === action.item.merchandiseId
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          )
        : [...state.cart.items, action.item]
      const totalQuantity = items.reduce((s, i) => s + i.quantity, 0)
      return {
        ...state,
        cart: { ...state.cart, items, totalQuantity },
      }
    }
    case 'OPTIMISTIC_REMOVE': {
      if (!state.cart) return state
      const items = state.cart.items.filter((i) => i.id !== action.lineId)
      const totalQuantity = items.reduce((s, i) => s + i.quantity, 0)
      return { ...state, cart: { ...state.cart, items, totalQuantity } }
    }
    case 'OPTIMISTIC_UPDATE': {
      if (!state.cart) return state
      const items =
        action.quantity === 0
          ? state.cart.items.filter((i) => i.id !== action.lineId)
          : state.cart.items.map((i) =>
              i.id === action.lineId ? { ...i, quantity: action.quantity } : i
            )
      const totalQuantity = items.reduce((s, i) => s + i.quantity, 0)
      return { ...state, cart: { ...state.cart, items, totalQuantity } }
    }
    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CartContextValue {
  cart: Cart | null
  isLoading: boolean
  isOpen: boolean
  error: string | null
  cartCount: number
  openCart: () => void
  closeCart: () => void
  addItem: (merchandiseId: string, quantity?: number, optimisticItem?: CartItem) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null,
    isLoading: false,
    isOpen: false,
    error: null,
  })

  const isMounted = useRef(false)

  // Hydrate cart on mount
  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    getCartAction().then((cart) => {
      dispatch({ type: 'SET_CART', cart })
    })
  }, [])

  const openCart = useCallback(() => dispatch({ type: 'SET_OPEN', open: true }), [])
  const closeCart = useCallback(() => dispatch({ type: 'SET_OPEN', open: false }), [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1, optimisticItem?: CartItem) => {
      if (optimisticItem) {
        dispatch({ type: 'OPTIMISTIC_ADD', item: optimisticItem })
      }
      dispatch({ type: 'SET_LOADING', loading: true })

      const { cart, error } = await addToCartAction(merchandiseId, quantity)

      if (error || !cart) {
        // Revert: refetch
        const freshCart = await getCartAction()
        dispatch({ type: 'SET_CART', cart: freshCart })
        dispatch({ type: 'SET_ERROR', error: error ?? 'Failed to add item' })
      } else {
        dispatch({ type: 'SET_CART', cart })
      }

      dispatch({ type: 'SET_LOADING', loading: false })
    },
    []
  )

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    dispatch({ type: 'OPTIMISTIC_UPDATE', lineId, quantity })
    dispatch({ type: 'SET_LOADING', loading: true })

    const { cart, error } = await updateCartAction(lineId, quantity)

    if (error || !cart) {
      const freshCart = await getCartAction()
      dispatch({ type: 'SET_CART', cart: freshCart })
      dispatch({ type: 'SET_ERROR', error: error ?? 'Failed to update item' })
    } else {
      dispatch({ type: 'SET_CART', cart })
    }

    dispatch({ type: 'SET_LOADING', loading: false })
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    dispatch({ type: 'OPTIMISTIC_REMOVE', lineId })
    dispatch({ type: 'SET_LOADING', loading: true })

    const { cart, error } = await removeFromCartAction(lineId)

    if (error || !cart) {
      const freshCart = await getCartAction()
      dispatch({ type: 'SET_CART', cart: freshCart })
      dispatch({ type: 'SET_ERROR', error: error ?? 'Failed to remove item' })
    } else {
      dispatch({ type: 'SET_CART', cart })
    }

    dispatch({ type: 'SET_LOADING', loading: false })
  }, [])

  const cartCount = state.cart?.totalQuantity ?? 0

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        isLoading: state.isLoading,
        isOpen: state.isOpen,
        error: state.error,
        cartCount,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
