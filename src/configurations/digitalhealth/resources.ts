export const dataSql = `SELECT id, study, numberParticipants,reportedOutcome,dataCollectionMethod,deviceType,devicePlatform,deviceLocation,sensorType,diagnosis,digitalAssessmentCategory,digitalAssessmentDetails,dataType,dataSubtype,dataDescriptionLocation, dataAccessInstructions FROM syn21994970.5 where dhPortalIndex = 'TRUE'`
export const publicationSql =
  'SELECT * FROM syn22017695.1 ORDER BY "Year" DESC, "Title" ASC'
export const studySql =
  "SELECT * FROM syn21994974.8 WHERE dhPortalIndex = 'TRUE' ORDER BY 'study'"
export const toolsSql = 'SELECT * FROM syn22014091.1 ORDER BY "softwareName"'
