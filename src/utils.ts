import { useEffect, useState } from 'react'

// This code scrolls an element into view, and accounts for the fixed top nav bar height.
export const scrollToWithOffset = (el: HTMLElement) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -90
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
}

const MOBILE_VIEWPORT_MAX_WIDTH_PX = 768

export function useShowDesktop(breakpoint?: number) {
  let usedBreakpoint = breakpoint ?? MOBILE_VIEWPORT_MAX_WIDTH_PX
  const [showDesktop, setShowDesktop] = useState(
    window.innerWidth > usedBreakpoint,
  )
  useEffect(() => {
    const listener = () => {
      const updatedValue = window.innerWidth > usedBreakpoint
      if (updatedValue !== showDesktop) {
        setShowDesktop(updatedValue)
      }
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener)
    }
  })

  return showDesktop
}
