export const dataSql = `SELECT id, studyOrProject, numberParticipants,reportedOutcome,dataCollectionMethod,deviceType,devicePlatform,deviceLocation,sensorType,diagnosis,digitalAssessmentCategory,digitalAssessmentDetails,dataType,dataSubtype,dataDescriptionLocation, dataAccessInstructions FROM syn21994970.2 where dhPortalIndex = 'TRUE'`
export const publicationSql =
  'SELECT * FROM syn22017695.1 ORDER BY "Year" DESC, "Title" ASC'
export const projectsSql =
  "SELECT * FROM syn21994974.4 WHERE  dhPortalIndex = 'TRUE' and isDHProject = 'TRUE' ORDER BY 'study'"
export const studySql =
  "SELECT * FROM syn21994974.4 WHERE ((isDHProject IS NULL) OR (isDHProject <> 'TRUE')) AND (dhPortalIndex = 'TRUE') ORDER BY 'study'"
export const toolsSql = 'SELECT * FROM syn22014091.1 ORDER BY "softwareName"'
