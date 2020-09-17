// Portal owners can change the versions of the resources by modifying the
// version of the entity used in the sql below
export const studiesSql = `SELECT * FROM syn21783965.1`
export const dataSql = "SELECT * FROM syn20821313"
export const metadataSql = 'SELECT id, metadataType, dataType, assay FROM syn20821313 WHERE "dataSubtype" = \'metadata\''
export const peopleSql = 'SELECT * FROM syn22096112.1'
export const grantSql = 'SELECT * FROM syn22096130.1'
export const publicationSql = 'SELECT * FROM syn22095937.1'
