import React from 'react'
import PropTypes from 'prop-types'
import styles from './Variable.module.css'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {Slider, Tooltip, IconButton, Button} from '@material-ui/core'
import {InfoIcon} from '@material-ui/icons/Info'
import { Input } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  variable: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 10,
      marginTop: 15,
      WebkitBoxShadow: '0px 1px 4px #00000033',
      boxShadow: '0px 1px 4px #00000033',
    },
    '& .MuiInputBase-input': {
      height: '1.6em',
      padding: '4px 6px 7px',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        borderRadius: 'inherit'
      },
    }
  }
}))

const VariableSlider = withStyles({
  root: {
    color: '#258B8B',
    height: 12,
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 12,
    borderRadius: 4,
  },
  rail: {
    height: 12,
    borderRadius: 4,
  },
})(Slider)

const Variable = (props) => {

  const [value, setValue] = React.useState(30)
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.variable}>
        <Grid item xs={6}>     
          <p> {props.title} </p>    
        </Grid>
        <Grid item xs={6}>
          <div>
            <Tooltip title={props.tooltip}>
              <span>
                <Button disabled>Info</Button>
              </span>
            </Tooltip>
          </div>
        </Grid>
        <Grid item xs={12}>
          <VariableSlider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item xs={6}>
          <Input type="text" value={props.value} disableUnderline={true}/>
        </Grid>
        <Grid item xs={6}>
          {props.descriptionLabel}
        </Grid>
      </Grid>
    </React.Fragment>    
  )  

}

Variable.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  descriptionLabel: PropTypes.string,
  tooltip: PropTypes.string,
}

Variable.defaultProps = {}

export default Variable
