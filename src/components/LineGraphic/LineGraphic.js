import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './LineGraphic.css'
import D3Line from './D3Line'

const LineGraphic = (props) => {
  const _rootNode = useRef(null)
 
   useEffect(() => {
    const { height, width, margin, grid } = props
    const xTicks = 8
    const configuration = { height, width, margin, grid, xTicks }
    const element = _rootNode.current
    
    props.chart.create(
      element,
      props.data,
      configuration
    )

    return () => {
      props.chart.destroy(element)
    } 
  }, [props])

  return (
    <div className='line-container' id='chart' ref={_rootNode} data-testid='LineGraphic'/>
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
