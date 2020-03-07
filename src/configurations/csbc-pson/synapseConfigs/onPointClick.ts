export const onPointClick = ({
  facetValue,
  type,
}: {
  facetValue: any
  type: any
}) => {
  const typeUpperCase = type.slice(0, 1).toUpperCase() + type.slice(1)
  let facet = 'theme'
  if (typeUpperCase === 'Grants' || typeUpperCase === 'Projects') {
    facet = 'consortium'
  }
  // @ts-ignore
  window.location = `/Explore/${typeUpperCase}?facet=${facet}&facetValue=${facetValue}`
}
