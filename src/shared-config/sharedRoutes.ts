import { GenericRoute } from 'types/portal-config'

const routes: GenericRoute[] = [
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
