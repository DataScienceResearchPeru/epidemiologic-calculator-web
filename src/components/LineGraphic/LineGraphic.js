import React from 'react'
import PropTypes from 'prop-types'
import styles from './LineGraphic.module.css'
import { Grid, Box, Tooltip, IconButton, Container  } from '@material-ui/core'
import Variable from '../Variable/Variable'
import { render } from '@testing-library/react'
import { makeStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles((theme) => ({
  root: {   
    boxRight: {
      backgroundColor: '#CCC',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      borderRadius: 17,
      padding: '30px 27px 50px',
      boxShadow: '0px 2px 10px #00000033',
      opacity: 1
    },
    boxForm: {
      maxWidth: 385,
    },
    box1: {
      marginRigth: '10px'
    }
  }
}))


const LineGraphic = () => {

  const classes = useStyles() 

  const changeValueVar1 = (val) => {
    console.log(val)
  } 

  return ( 
    <Container component="main" maxWidth="lg">

      <Grid container className={classes.root}>

        <Grid item xs={6}>

          <div className={classes.boxRight}>
            <Grid container justify="center" alignItems="center">

              <Grid item xs={4}>
                <Variable title="Tamaño de la poblacion" descriptionLabel="personas" value={88575.00} changeValues={changeValueVar1}>          
                  <Tooltip title="info 1">
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Variable>
              </Grid>

              <Grid item xs={4}>
                <Variable title="Numero inicial de infectados" descriptionLabel="infectados" value={4} >
                  <Tooltip title="info 1">
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Variable>
              </Grid>

              <Grid item xs={4}>
                <Variable title="Medida de contagio" descriptionLabel="infectados" value={2.2} >
                  <Tooltip title="info 1">
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Variable>
              </Grid>

              <Grid item xs={4}>
                <Variable title="Numero inicial de infectados" descriptionLabel="infectados" value={4} >
                  <Tooltip title="info 1">
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Variable>
              </Grid>


              <Grid item xs={4}>
              
              </Grid>

              <Grid item xs={4}>
                <Variable title="Tiempo de infeccion del paciente" descriptionLabel="dias" tooltip="info 2" value={6.9} >
                  <Tooltip title="info 1">
                    <IconButton aria-label="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Variable>
              </Grid>

            </Grid>   
          </div>
        </Grid>


        <Grid item xs={6}>

          <Grid container justify="center" alignItems="center">

            <Grid item xs={4}>
              <Variable title="Tamaño de la poblacion" descriptionLabel="personas" value={88575.00} >          
                <Tooltip title="info 1">
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Variable>
            </Grid>

            <Grid item xs={4}>
              <Variable title="Numero inicial de infectados" descriptionLabel="infectados" value={4} >
                <Tooltip title="info 1">
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Variable>
            </Grid>

            <Grid item xs={4}>
              <Variable title="Medida de contagio" descriptionLabel="infectados" value={2.2} >
                <Tooltip title="info 1">
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Variable>
            </Grid>

            <Grid item xs={4}>
              <Variable title="Numero inicial de infectados" descriptionLabel="infectados" value={4} >
                <Tooltip title="info 1">
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Variable>
            </Grid>


            <Grid item xs={4}>
                
            </Grid>

            <Grid item xs={4}>
              <Variable title="Tiempo de infeccion del paciente" descriptionLabel="dias" tooltip="info 2" value={6.9} >
                <Tooltip title="info 1">
                  <IconButton aria-label="info">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Variable>
            </Grid>

          </Grid>   

        </Grid>
      </Grid>
      
    </Container>
  )

}

LineGraphic.propTypes = {}

LineGraphic.defaultProps = {}

export default LineGraphic
