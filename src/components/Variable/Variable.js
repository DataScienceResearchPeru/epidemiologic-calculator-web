import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import VariableItem from '../VariableItem/VariableItem'

const useStyles = makeStyles((theme) => ({
  contentVariable: {
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& h3': {
      margin: '11px 0',
      textTransform: 'uppercase',
      fontSize: '0.71em',
      color: '#24DADA'
    }
  },
  contentItems: {
    boxShadow: '0px 1px 6px #00000029',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: '7px 7px 0',
    minHeight: 236
  },
  subtitle: {
    margin: 0,
    backgroundColor: '#BFBFBF',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '12px',
    borderRadius: 8,
    padding: 6
  }
}))

const Variable = (props) => {
  const classes = useStyles()
  const { columns, title } = props 
  let show = false

  const changeValueVar1 = (val) => {
    console.log(val)
  }

  return (
    <Box className={classes.contentVariable} data-testid='Variable'>
      <h3>{title}</h3>
      <Box className={classes.contentItems}>
        <Grid container justify='center' spacing={1}>
          {
            columns.values.map((value, index) => (
              <Grid item xs key={index}>
                <h5 className={classes.subtitle}>{value.title}</h5>
                {
                  value.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <VariableItem
                        title={item.title}
                        descriptionLabel={item.label}
                        descriptionTooltip={item.help}
                        valueInitial={item.value} 
                        changeValues={changeValueVar1} />
                      {
                        value.items.length === 2 
                          ? show = index < 1 ? true : false
                          : value.items.length > 1 
                            ? show = index < 3 ? true : false
                            : null
                      }
                      { show && <Divider variant="middle" /> }
                    </React.Fragment>  
                  ))
                }
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Box>
  )
}

Variable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        label: PropTypes.string,
        help: PropTypes.string,
        value: PropTypes.number
      }))
    }))
  }
  )

}

Variable.defaultProps = {}

export default Variable
