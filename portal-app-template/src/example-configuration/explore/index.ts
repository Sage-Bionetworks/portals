import { data } from './data'
import { Publications } from './publications'
import { QueryWrapperMenuProps } from 'synapse-react-client/dist/containers/QueryWrapperMenu'

export type QWMProps = {
  [index:string]: any
}

const exploreSynapseConfigs: QWMProps = {
  Publications,
  default: data,
  data: data.props,
}

export { exploreSynapseConfigs }
