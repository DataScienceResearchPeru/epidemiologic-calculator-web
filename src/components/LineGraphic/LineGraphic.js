import React, { useEffect } from 'react'
import { useResource } from 'react-request-hook'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './LineGraphic.css'
import line from './lineChart'
import { api } from '../../middleware/api'

const useStyles = makeStyles((theme) => ({
  LineGraphic: {
    boxShadow: '0px 1px 6px #00000029',
    borderRadius: 12,
    padding: '16px 18px 22px 24px',
    marginTop: theme.spacing(3.1)
  }
}))

const LineGraphic = (props) => {
  const { height, width, margin } = props
  const [data, getData] = useResource(api.getDataSeaichurd)
  const classes = useStyles()
  const container = d3.select('#figure')
  const chart = line()
    .height(height)
    .width(width)
    .margin(margin)
    .grid('full')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getData(), [])

  if (!data.isLoading && data.data) {
    container.datum(data.data).call(chart)
  }

  return (
    <Box className={classes.LineGraphic} data-testid='LineGraphic'>
      <div className='line-container' id='figure' />
    </Box>
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
