'use client'

import { useEffect, useRef } from 'react'

export function AnnouncementBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      if (window.scrollY > 60) {
        el.style.transform = 'translateY(-100%)'
      } else {
        el.style.transform = 'translateY(0)'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 70,
        height: '38px',
        backgroundColor: '#F8BC51',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#422C00',
        }}
      >
        FREE SHIPPING ON ALL ORDERS OVER $99&nbsp;&nbsp;·&nbsp;&nbsp;JOIN THE VIKING ELITE REWARDS PROGRAM
      </span>
    </div>
  )
}
