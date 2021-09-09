import { GenericRoute } from 'types/portal-config'

// We handle the "normal" home route in App.tsx
// This just gives us a fallback to use if we hit a failure case in the RouteResolver
export const homeRoute: GenericRoute = {
  to: '/Home',
  isNested: false,
  synapseConfigArray: [
    {
      name: 'RedirectWithQuery',
      props: {
        to: '/',
      },
    },
  ],
}

const routes: GenericRoute[] = [
  homeRoute,
  {
    to: 'DownloadCart',
    isNested: false,
    hideRouteFromNavbar: true,
    displayName: 'Download Cart',
    synapseConfigArray: [
      {
        name: 'DownloadCartPage',
        props: {},
        isOutsideContainer: true,
      },
    ],
  },
]

export default routes
