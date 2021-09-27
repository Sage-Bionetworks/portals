import { useMedia } from 'react-use'

// This code scrolls an element into view, and accounts for the fixed top nav bar height.
export const scrollToWithOffset = (el: HTMLElement) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -90
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
}

export const DESKTOP_VIEWPORT_MIN_WIDTH_PX = 769
export const DESKTOP_VIEWPORT_MIN_WIDTH_MEDIA_QUERY = `(min-width: ${DESKTOP_VIEWPORT_MIN_WIDTH_PX}px)`

export const useShowDesktop = () =>
  useMedia(DESKTOP_VIEWPORT_MIN_WIDTH_MEDIA_QUERY)
