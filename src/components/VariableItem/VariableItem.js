import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Input, IconButton, Slider, Tooltip, Grid } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
  variable: {
    marginTop: theme.spacing(1.3),
    marginBottom: theme.spacing(1.3),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    color: '#404040',
    fontSize: '11px',
    fontWeight: 320,
    padding: '0 8px',
    lineHeight: '12px',
    '& .MuiInputBase-root': {
      border: '0.5px solid #BFBFBF',
      borderRadius: 8,
      marginTop: '0px !important'
    },
    '& .MuiInputBase-input': {
      height: '0.7em',
      padding: 6,
      fontSize: '12px',
      textAlign: 'center',
      fontWeight: 320,
      color: '#404040',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        borderRadius: 'inherit'
      }
    },
    '& .MuiGrid-item': {
      padding: '2px 8px !important',
      margin: 'auto'
    },
    '& .MuiIconButton-root': {
      float: 'right',
      padding: 0
    },
    '& p': {
      float: 'right',
      margin: 0
    }
  }
}))

const VariableSlider = withStyles({
  root: {
    color: '#258B8B',
    padding: '5px 0 10px 0'
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 3,
    background: 'transparent linear-gradient(90deg, #24DADA 0%, #258B8B 100%) 0% 0% no-repeat padding-box'
  },
  rail: {
    height: 8,
    borderRadius: 3,
    background: '#D3D3D3 0% 0% no-repeat padding-box'
  }
})(Slider)

const VariableItem = (props) => {
  const { valueInitial } = props
  const defaultValue = valueInitial || 0
  const maxValue = defaultValue < 100 ? 100 : defaultValue + (defaultValue * 0.9)
  const [value, setValue] = useState(defaultValue)
  const classes = useStyles()

  const handleSliderChange = (e, newValue) => {
    setValue(newValue)
    if (props.onChange) {
      props.onChange(newValue)
    }
  }

  const handleInputChange = (e) => {
    setValue(e.target.value === '' ? '' : Number(e.target.value))

    if (props.onChange && e.target.value !== '') {
      props.onChange(Number(e.target.value))
    }
  }

  return (
    <Grid container spacing={2} className={classes.variable} data-testid='VariableItem'>
      <Grid item xs={9}>
        <span>{props.title}</span>
      </Grid>
      <Grid item xs={3}>
        <Tooltip title={props.descriptionTooltip}>
          <IconButton aria-label='info'>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        <VariableSlider
          max={maxValue}
          step={0.1}
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby='input-slider'
          valueLabelDisplay='auto'
        />
      </Grid>
      <Grid item xs={7}>
        <Input
          value={value}
          onChange={handleInputChange}
          disableUnderline
          inputProps={{
            min: 0,
            max: 100,
            type: 'text',
            'aria-labelledby': 'input-slider'
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <p>{props.descriptionLabel}</p>
      </Grid>
    </Grid>
  )
}

VariableItem.propTypes = {
  title: PropTypes.string,
  valueInitial: PropTypes.number,
  descriptionLabel: PropTypes.string,
  descriptionTooltip: PropTypes.string,
  onChange: PropTypes.func
}

VariableItem.defaultProps = {}

export default VariableItem
