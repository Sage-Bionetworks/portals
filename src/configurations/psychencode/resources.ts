// Portal owners can change the versions of the resources by modifying the
// version of the entity used in the sql below

const dataSynId = 'syn20821313.5'
export const studiesSql = 'SELECT * FROM syn21783965.4'
export const dataSql = `SELECT * FROM ${dataSynId}`
export const metadataSql = `SELECT id, metadataType, dataType, assay FROM ${dataSynId} WHERE "dataSubtype" = \'metadata\'`
export const peopleSql = 'SELECT * FROM syn22096112.3'
export const grantSql = 'SELECT * FROM syn22096130.4'
export const publicationSql = 'SELECT * FROM syn22095937.4 order by authors asc'
export const upsetplotSql = `SELECT unnest(individualID), assay FROM ${dataSynId} WHERE individualID is not null GROUP BY assay, unnest(individualID)`
