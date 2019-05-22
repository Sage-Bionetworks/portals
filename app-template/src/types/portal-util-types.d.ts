import { SynapseConfig } from './portal-config'

/* 
  These are types that come up frequently between portals but are an
  implementation detail, not a core type that should be relied up in 
  the portal.
*/

export type HomeExploreConfig = {
  homePageSynapseObject: QueryWrapper
  explorePageSynapseObject: SynapseConfig
}

declare module "*.svg" {
  const content: string;
  export default content;
}