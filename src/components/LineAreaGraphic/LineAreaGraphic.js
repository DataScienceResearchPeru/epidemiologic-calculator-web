import React from 'react'
// import PropTypes from 'prop-types'
import styles from './LineAreaGraphic.module.css'
import { Skeleton } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { Get } from 'react-axios'
import { Chart, Lines, Transform, Ticks, Bars, Layer } from 'rumble-charts'

import axiosInstance from '../../middleware/api'


const LineAreaGraphic = () => (
  <div className={styles.LineAreaGraphic} data-testid="LineAreaGraphic">
    <Get url="seird" instance={axiosInstance}>
      {(error, response, isLoading, makeRequest, axios) => {
        if(error) {
          return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
        }
        else if(isLoading) {
          return (<Box style={{ width: '80%', margin: 'auto', marginTop: '1em'}} ><Skeleton variant="rect" height='30em' /></Box>)
        }
        else if(response !== null) {
          const series = [
            // {
            //   data: response.data.susceptible
            // },
            // {
            //   data: response.data.exposed
            // },
            {
              data: response.data.infected
            },
            {
              data: response.data.recovered
            },
            {
              data: response.data.death
            },
            {
              data: response.data.time
            }
          ]
          return (
            <Box style={{ width: '80%', margin: 'auto', marginTop: '1em'}} >
              <Chart width={1000} height={500} series={series} minY={0}>
                <Layer width='80%' height='90%' position='top center'>
                  <Ticks
                    axis='y'
                    lineLength='100%'
                    lineVisible={true}
                    lineStyle={{stroke:'lightgray'}}
                    labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
                    labelAttributes={{x: -5}}
                    labelFormat={label => label}
                  />
                
                  <Transform method='stack'>
                    <Bars combined={true} innerPadding='0%' />
                  </Transform>
                </Layer>
              </Chart>
            </Box>
          )
        }
        return (<div>Default message before request is made.</div>)
      }}
    </Get>
  </div>
)

LineAreaGraphic.propTypes = {}

LineAreaGraphic.defaultProps = {}

export default LineAreaGraphic
