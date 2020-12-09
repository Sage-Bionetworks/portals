// This code scrolls an element into view, and accounts for the fixed top nav bar height.
export const scrollToWithOffset = (el:HTMLElement) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -90
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
}
