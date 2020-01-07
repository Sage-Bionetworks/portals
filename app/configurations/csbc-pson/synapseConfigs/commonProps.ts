export const facetAliases = {
  'tissue_or_organ.sv': 'Tissue',
  experimentalStrategy: 'Assay',
  Title: 'Publication',
  diseaseType: 'Tumor Type',
  'Publication Year': 'Year',
  grantNumber: 'Grant',
  fileFormat: 'Data Format',
  sex: 'Gender',
  inputDataType: 'Input Data',
  outputDataType: 'Output Data',
  softwareLanguage: 'Language',
  toolName: 'Name',
}

export const detailPageLinks = [
  {
    isMarkdown: false,
    baseURL: 'Explore/Publications',
    URLColumnName: 'Title',
    matchColumnName: 'Title',
  },
  {
    isMarkdown: false,
    baseURL: 'Explore/Studies',
    URLColumnName: 'studies',
    matchColumnName: 'studies',
  },
  {
    isMarkdown: false,
    baseURL: 'Explore/Grants',
    URLColumnName: 'centerName',
    matchColumnName: 'centerName',
  },
  {
    isMarkdown: false,
    baseURL: 'Explore/Datasets',
    URLColumnName: 'datasets',
    matchColumnName: 'datasets',
  },
]
