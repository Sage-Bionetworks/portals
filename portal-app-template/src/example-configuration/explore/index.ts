import { data } from './data'
import { Publications } from './publications'

export type QWMProps = {
  [index:string]: any
}

const exploreSynapseConfigs: QWMProps = {
  Publications,
  default: Publications,
  Data: data,
}

export { exploreSynapseConfigs }
