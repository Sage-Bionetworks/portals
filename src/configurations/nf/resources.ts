export const datasetsSql = 'SELECT * FROM syn16859580'
export const publicationsSql = 'SELECT * FROM syn16857542'
export const studiesSql = 'SELECT * FROM syn16787123'
export const toolsSql = 'SELECT * FROM syn16859448'
export const peopleSql = 'SELECT * FROM syn23564971'
export const filesSql = `SELECT id AS "File ID", assay, dataType, diagnosis, tumorType,  species, individualID,  fileFormat, dataSubtype, nf1Genotype as "NF1 Genotype", nf2Genotype as "NF2 Genotype", studyName, fundingAgency, consortium, name AS "File Name", accessType, accessTeam  FROM syn16858331 WHERE resourceType = 'experimentalData'`
