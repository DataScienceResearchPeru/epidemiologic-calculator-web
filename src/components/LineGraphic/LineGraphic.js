import React, { useEffect } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import './LineGraphic.css'
import line from './lineChart'

const LineGraphic = (props) => {
  const { height, width, margin } = props
  const data = [
    {
      time: 0,
      frequency: 0.08167
    },
    {
      time: 1,
      frequency: 0.01492
    },
    {
      time: 2,
      frequency: 0.02782
    },
    {
      time: 3,
      frequency: 0.04253
    },
  ]

  useEffect(() => {
    const container = d3.select('#figure')
    const chart = line().grid('full')
    container.datum(data).call(chart)
  }, [])
  
  return (
    <div className="LineGraphic" data-testid="LineGraphic">
      <div className="line-container" id="figure"></div>
    </div>
  )
}


LineGraphic.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  })
}

LineGraphic.defaultProps = {}

export default LineGraphic
