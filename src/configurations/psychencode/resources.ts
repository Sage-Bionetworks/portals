// Portal owners can change the versions of the resources by modifying the
// version of the entity used in the sql below
export const studiesSql = `SELECT * FROM syn21783965`
export const dataSql = "SELECT `resourceType`, `dataType`, `assay`, COUNT(`id`) AS `Files` FROM syn20821313 WHERE (`dataSubtype` <> 'metadata' OR `dataSubtype` IS NULL) GROUP BY 1, 2, 3 ORDER BY 4 DESC"
export const metadataSql = 'SELECT id, metadataType, dataType, assay FROM syn20821313 WHERE "dataSubtype" = \'metadata\''
export const peopleSql = 'SELECT * FROM syn22096112'
export const grantSql = 'SELECT * FROM syn22096130'
export const publicationSql = 'SELECT * FROM syn22095937'
