import React, { useEffect } from 'react'
import { useResource } from 'react-request-hook'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

import './LineGraphic.css'
import line from './lineChart'
import { api } from '../../middleware/api'

const LineGraphic = (props) => {
  const { height, width, margin } = props
  const [ data, getData ] = useResource(api.getDataSeaichurd)

  const _dataset = {
    // 'susceptible': [32000000, 31999997.300972864, 31999994.836279575, 31999992.344414793, 31999989.73336847],
    'exposed': [0, 1.8785113645858658, 2.619041881620474, 2.994132262137893, 3.257469918444592],
    'asymptomatic': [0, 0.3331599671679411, 0.8934383032551654, 1.4166070440176894, 1.8550816317264585],
    'infected': [6, 4.839975677853082, 4.409285771746417, 4.292018788059324, 4.331331347636197],
    'quarantine': [0, 0, 0, 0, 0],
    'hospitalized': [0, 1.4289791175320588, 2.3832276931655243, 3.089879429846452, 3.659970352214631],
    'uci': [0, 0.11397377252304237, 0.39548517385653886, 0.7877692550710447, 1.2596303620038263],
    'recovered': [0, 0.8779690077513913, 1.8235851163759083, 2.89849998638043, 4.109208435898688],
    'death': [0, 0.007064330768036353, 0.016737197626451473, 0.02949318366050351, 0.04565165249757906],
    'time': [0, 1, 2, 3, 4]
  }
  
  // useEffect(() => getData(), [])

  useEffect(() => {
    const container = d3.select('#figure')
    const chart = line().grid('full')
    container.datum(_dataset).call(chart)
  }, [])

  // if (!data.isLoading) {
  //   console.log('====', data)
  // }


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
