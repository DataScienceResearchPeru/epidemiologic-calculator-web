import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './LineGraphic.css'
import D3Line from './D3Line'

const LineGraphic = (props) => {
  const _rootNode = useRef(null)
  const mounted = useRef(null)
  const _chart = useRef(null)

  useEffect(() => {
    const element = _rootNode.current
    const { height, width, margin, grid } = props
    const xTicks = 8
    const configuration = { height, width, margin, grid, xTicks }

    if (!mounted.current) {
      _chart.current = props.chart.create(
        element,
        props.data,
        configuration
      )
      mounted.current = true
    } else {
      props.chart.update(
        element,
        props.data,
        configuration,
        _chart.current
      )
    }

    return () => {
      props.chart.destroy(element)
    }
  }, [props])

  return (
    <div className='line-container' id='chart' ref={_rootNode} data-testid='LineGraphic' />
  )
}

LineGraphic.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  grid: PropTypes.string,
  chart: PropTypes.object
}

LineGraphic.defaultProps = {
  chart: D3Line
}

export default LineGraphic
