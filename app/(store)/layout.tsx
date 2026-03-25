// The (store) route group inherits the root layout (Header, Footer, CartProvider).
// This layout exists only to enable a shared loading/error boundary
// for all store routes if needed.

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
