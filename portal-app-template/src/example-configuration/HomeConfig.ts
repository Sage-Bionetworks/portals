import { HomeConfig } from '../types/portal-config'
import { SynapseConstants } from 'synapse-react-client'

const Home: HomeConfig = {
  synapseObjects: [
    {
      title: 'Explore Cards',
      name: 'CardContainerLogic',
      props: {
        sql: 'SELECT * FROM syn9630847',
        type: SynapseConstants.CSBC_DATASET,
        limit: 3
      }
    },
    {
      title: 'Some Markdown',
      name: 'Markdown',
      props: {
        ownerId: 'syn7080714',
        wikiId: '470467',
      }
    }
  ]
}

export default Home
