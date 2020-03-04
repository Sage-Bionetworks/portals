export const onPointClick = ({
  facetValue,
  type,
}: {
  facetValue: string
  type: string
}) => {
  const typeUpperCase = type.slice(0, 1).toUpperCase() + type.slice(1)
  // @ts-ignore
  window.location = `/Explore/${typeUpperCase}?facet=Theme&facetValue=${facetValue.toLowerCase()}`
}
