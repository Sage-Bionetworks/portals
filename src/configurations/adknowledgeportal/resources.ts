export const computationalSql = 'Select * from syn20337467'
export const dataSql = 'SELECT * FROM syn11346063.20'
export const dataOnStudiesPageSql =
  "SELECT id, metadataType, dataType, assay FROM syn11346063.20 WHERE `resourceType` = 'metadata'"
export const peopleSql = 'SELECT * FROM syn13897207'
export const projectsSql = 'SELECT * FROM syn17024229 ORDER BY isFeatured DESC'
export const publicationsSql = 'SELECT * FROM syn20448807'
export const studiesSql = 'SELECT * FROM syn17083367 ORDER BY isFeatured DESC'
export const programsSql = 'SELECT * FROM syn17024173'

export const experimentalModelsSql = 'select * from syn22219805'

// Convert the `title` column to markdown, linking to the `link` column
export const targetEnablingResourcesExploreSql =
  'select title, category, target, related_target, program, grant, contributing_center, link from syn26146692 WHERE `isPublic` = true'
export const targetEnablingResourcesDetailsPageSql =
  'select * from syn26146692 WHERE `isPublic` = true'
