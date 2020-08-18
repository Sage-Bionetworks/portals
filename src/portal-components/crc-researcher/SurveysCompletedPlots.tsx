import React, { FunctionComponent, useEffect, useState } from 'react'
import Plotly from 'plotly.js-basic-dist'
import * as PlotlyTyped from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import { SynapseConstants } from 'synapse-react-client'
import {
  QueryBundleRequest,
  QueryResultBundle
} from 'synapse-react-client/dist/utils/synapseTypes'
import { getQueryTableResults } from 'synapse-react-client/dist/utils/SynapseClient'

const Plot = createPlotlyComponent(Plotly)

export type SurveysCompletedPlotsProps = {
  token?: string
  style?: React.CSSProperties
}

type PlotData = {
  surveyCounts: number[]
  totalCount: number
}

const colors: string[] = ['#D099CA', '#7292C1', '#7472C1', '#72C1A5']
const baseLayoutConfig: Partial<PlotlyTyped.Layout> = {
  showlegend: false,
  margin: {
    l: 25,
    r: 25,
    b: 25,
    t: 25,
    pad: 15,
  },
  height: 200,  
}

const optionsConfig: Partial<PlotlyTyped.Config> = {
  responsive: true,
  scrollZoom: false,
  editable: false,
  autosizable: true,
  displayModeBar: false,
}
function getLayoutConfig(offset: number, plotData: PlotData): Partial<PlotlyTyped.Layout> {
  const newLayoutConfig: Partial<PlotlyTyped.Layout> = {...baseLayoutConfig}
  
  newLayoutConfig.annotations = [
    {
      text: `${plotData.surveyCounts[offset]}/${plotData.totalCount} <br />completed <br />surveys ${offset + 1}`,
      showarrow: false,
    }
  ]
  return newLayoutConfig
}
function getChartDataPoints(offset: number, plotData: PlotData) {
  const surveyData: PlotlyTyped.Data = {
    values: [plotData.surveyCounts[offset], plotData.totalCount - plotData.surveyCounts[offset]],
    name: `Survey ${offset + 1} Completed`,
    hole: .6,
    type: 'pie',
    marker: {
      colors: [colors[offset], '#E9F1F5']
    },
    textinfo: 'none'
  }

  const data = [surveyData]
  return data
}

export function fetchData(
  token: string,
  sql: string,
  entityId: string,
): Promise<number> {
  const queryRequest: QueryBundleRequest = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_COUNT,
    entityId: entityId,
    query: {
      sql: sql,
    },
  }
  return getQueryTableResults(queryRequest, token).then(
    (data: QueryResultBundle) => {
      return data.queryCount!
    },
  )
}

const SurveysCompletedPlots: FunctionComponent<SurveysCompletedPlotsProps> = ({
  token,
  style = { width: '100%', height: '300px'},
}: SurveysCompletedPlotsProps) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [plotData, setPlotData] = useState<PlotData | null>(null)

  const survey1Sql = 'SELECT * FROM syn22311184 WHERE survey_1 = \'TRUE\''
  const survey2Sql = 'SELECT * FROM syn22311184 WHERE survey_2 = \'TRUE\''
  const survey3Sql = 'SELECT * FROM syn22311184 WHERE survey_3 = \'TRUE\''
  const survey4Sql = 'SELECT * FROM syn22311184 WHERE survey_4 = \'TRUE\''
  const totalSql = 'SELECT * FROM syn22311184'
  
  useEffect(() => {
    const survey1Data = fetchData(token!, survey1Sql, 'syn22311184')
    const survey2Data = fetchData(token!, survey2Sql, 'syn22311184')
    const survey3Data = fetchData(token!, survey3Sql, 'syn22311184')
    const survey4Data = fetchData(token!, survey4Sql, 'syn22311184')
    const totalData = fetchData(token!, totalSql, 'syn22311184')
    
    Promise.all([survey1Data, survey2Data, survey3Data, survey4Data, totalData])
      .then((result) => {
        setPlotData({
          surveyCounts: [result[0], result[1], result[2], result[3]],
          totalCount: result[4]
        })
        setIsLoaded(true)
      })
      .catch((err) => {
        throw err
      })
    return () => {}
  }, [token])

  return (
    <>
      {!isLoaded && token && (
        <div className="text-center">
          <span className="spinner" />
        </div>
      )}

      {isLoaded && plotData && token && (
        <div style={style} className="SRC-card-grid-row">
          <Plot
            layout={getLayoutConfig(0, plotData)}
            config={optionsConfig}
            data={getChartDataPoints(0, plotData)}
            style={{flexBasis: '25%'}}
          />
          <Plot
            layout={getLayoutConfig(1, plotData)}
            config={optionsConfig}
            data={getChartDataPoints(1, plotData)}
            style={{flexBasis: '25%'}}
          />
          <Plot
            layout={getLayoutConfig(2, plotData)}
            config={optionsConfig}
            data={getChartDataPoints(2, plotData)}
            style={{flexBasis: '25%'}}
          />
          <Plot
            layout={getLayoutConfig(3, plotData)}
            config={optionsConfig}
            data={getChartDataPoints(3, plotData)}
            style={{flexBasis: '25%'}}
          />

        </div>
      )}
    </>
  )
}

export default SurveysCompletedPlots
