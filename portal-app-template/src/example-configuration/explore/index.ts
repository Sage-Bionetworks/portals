import { Data } from './data'
import { Publications } from './publications'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'

export type QWMProps = {
  [index:string]: QueryWrapperMenuProps
}

const exploreSynapseConfigs: QWMProps = {
  Data,
  Publications,
  default: Data
}

export { exploreSynapseConfigs }
