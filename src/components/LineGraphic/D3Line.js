import * as d3 from 'd3'
import line from './lineChart'

const setChartProperty = (chart, configuration, key) => {
  if (configuration[key] || typeof configuration[key] === 'string') {
    chart[key](configuration[key])
  }
}

const applyConfiguration = (chart, configuration) => {
  Object.keys(configuration).forEach(
    setChartProperty.bind(null, chart, configuration)
  )

  return chart
}

const chart = line()

const D3Line = {}

D3Line.create = (el, data, configuration = {}) => {
  const container = d3.select(el)

  if (data) {
    container.datum(data).call(applyConfiguration(chart, configuration))
  } else {
    container.call(applyConfiguration(chart, configuration))
  }
}

D3Line.destroy = () => {}

export default D3Line
