import React, { FunctionComponent, useEffect, useState } from 'react'
import Plotly from 'plotly.js-basic-dist'
import * as PlotlyTyped from 'plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
import _ from 'lodash-es'
import { SynapseConstants } from 'synapse-react-client'
import {
  QueryBundleRequest,
  QueryResultBundle,
  RowSet,
} from 'synapse-react-client/dist/utils/synapseTypes'
import { getFullQueryTableResults } from 'synapse-react-client/dist/utils/SynapseClient'
import { GraphItem } from 'synapse-react-client/dist/containers/widgets/themes-plot/types'
import { resultToJson } from 'synapse-react-client/dist/utils/functions/sqlFunctions'

const Plot = createPlotlyComponent(Plotly)

export type StatusLineChartProps = {
  token?: string
  style?: React.CSSProperties
}

type PlotData = {
  collected: GraphItem[]
  invited: GraphItem[]
  apptScheduled: GraphItem[]
  apptMade: GraphItem[]
}

const barLayoutConfig: Partial<PlotlyTyped.Layout> = {
  showlegend: true,
  yaxis: {
    title: {
      text: 'Number of participants ',
    },
  },

  xaxis: {
    title: {
      text: 'Date',
    },
    autorange: true,
    type: 'date',
  },
  dragmode: false,
  hovermode: 'closest',
  margin: {
    l: 200,
    r: 50,
    b: 50,
    t: 50,
    pad: 15,
  },
}

const optionsConfig: Partial<PlotlyTyped.Config> = {
  responsive: true,
  scrollZoom: false,
  editable: false,
  autosizable: true,
  displayModeBar: false,
}

function getChartDataPoints(data: PlotData) {
  const collectedData: PlotlyTyped.Data = {
    x: data.collected.map((val) => new Date(Number(val.x))),
    y: data.collected.map((val) => val.y),
    name: 'New uncategorized participants',
    type: 'scatter',
    hovertemplate: `%{x|%x} (%{y})`,
    marker: {
      color: '#000',
      size: 12,
      symbol: 'triangle-up',
    },
    line: {
      dash: 'dash',
      width: 1,
      color: '#000',
    },
  }

  var invitedData: PlotlyTyped.Data = {
    x: data.invited.map((val) => new Date(Number(val.x))),
    y: data.invited.map((val) => val.y),
    name: 'Invitations sent',
    type: 'scatter',
    hovertemplate: `%{x|%x} (%{y})`,
    marker: {
      color: '#000',
      size: 12,
      symbol: 'square',
    },
    line: {
      dash: 'solid',
      width: 1,
      color: '#000',
    },
  }

  var aptScheduledData: PlotlyTyped.Data = {
    x: data.apptScheduled.map((val) => new Date(Number(val.x))),
    y: data.apptScheduled.map((val) => val.y),
    name: 'Labs scheduled',
    type: 'scatter',
    hovertemplate: `%{x|%x} (%{y})`,
    line: {
      dash: 'dot',
      width: 1,
      color: '#000',
    },
    marker: {
      color: '#000',
      size: 12,
      symbol: 'circle',
    },
  }
  var apptMadeData: PlotlyTyped.Data = {
    x: data.apptMade.map((val) => new Date(val.x)),
    y: data.apptMade.map((val) => val.y),
    name: 'Samples Collected/Appointments Made ',
    type: 'scatter',
    hovertemplate: `%{x|%x} (%{y})`,

    line: {
      dash: 'solid',
      width: 1,
      color: '#000',
    },
    marker: {
      color: '#000',
      size: 12,
      symbol: 'star',
    },
  }

  var data2 = [collectedData, invitedData, aptScheduledData, apptMadeData]
  return data2
}

export function fetchData(
  token: string,
  sql: string,
  entityId: string,
): Promise<RowSet> {
  const queryRequest: QueryBundleRequest = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    entityId: entityId,
    query: {
      sql: sql,
    },
  }

  return getFullQueryTableResults(queryRequest, token).then(
    (data: QueryResultBundle) => {
      return data.queryResult.queryResults
    },
  )
}

const StatusLineChart: FunctionComponent<StatusLineChartProps> = ({
  token,
  style = { width: '100%', height: '100%', margin: '30px 10px' },
}: StatusLineChartProps) => {
  // get plot data!
  const [isLoaded, setIsLoaded] = useState(false)
  const [barPlotQueryData, setBarPlotQueryData] = useState<GraphItem[]>([])
  const [plotData, setPlotData] = useState<PlotData | null>(null)
  const samplesCollectedSql =
    'SELECT uploadDate as "x", count(distinct(recordId)) as "y" FROM syn22154087 WHERE scheduledLabDrawOn IS NOT NULL GROUP BY uploadDate ORDER BY uploadDate'
  const inviteSentSql =
    'SELECT inviteSentOn as "x", count(distinct(recordId)) as "y" FROM syn22154087 WHERE inviteSentOn IS NOT NULL GROUP BY inviteSentOn ORDER BY inviteSentOn'
  const appointmentScheduledSql =
    'SELECT scheduledLabDrawOn as "x", count(distinct(recordId)) as "y" FROM syn22154087 WHERE scheduledLabDrawOn IS NOT NULL GROUP BY scheduledLabDrawOn ORDER BY scheduledLabDrawOn'
  const appointmentMadeSql =
    'SELECT uploadDate as "x", count(distinct(recordId)) as "y" FROM syn22028237 where `metadata.type` =  \'appointment\' AND uploadDate IS NOT NULL GROUP BY uploadDate'

  useEffect(() => {
    const collectedData = fetchData(token!, samplesCollectedSql, 'syn22154087')
    const invitedData = fetchData(token!, inviteSentSql, 'syn22154087')
    const apptScheduledData = fetchData(
      token!,
      appointmentScheduledSql,
      'syn22154087',
    )
    const apptMadeData = fetchData(token!, appointmentMadeSql, 'syn22028237')
    Promise.all([collectedData, invitedData, apptScheduledData, apptMadeData])
      .then((result) => {
        setPlotData({
          collected: resultToJson(result[0].headers, result[0].rows),
          invited: resultToJson(result[1].headers, result[1].rows),
          apptScheduled: resultToJson(result[2].headers, result[2].rows),
          apptMade: resultToJson(result[3].headers, result[3].rows),
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
        <div style={{ width: '100%', backgroundColor: 'blue' }}>
          <Plot
            layout={barLayoutConfig}
            style={{ width: '100%' }}
            config={optionsConfig}
            data={getChartDataPoints(plotData)}
          />
        </div>
      )}
    </>
  )
}

export default StatusLineChart
