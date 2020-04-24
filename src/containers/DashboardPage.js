import React from 'react'
import { Container, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LineAreaGraphic from '../components/LineGraphic/LineGraphic'

import Variable from '../components/Variable/Variable'

const useStyles = makeStyles((theme) => ({
  sectionContent: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: '33px 67px',
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    boxShadow: '0px 2px 10px #00000029'
  },
  information: {
    textAlign: 'left',
    color: '#404040',
    fontSize: '14px',
    fontWeight: 320,
    marginBottom: 31,
  }

}))

const DashboardPage = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box className={classes.sectionContent}>
          <div className={classes.information}>
            Simula escenarios de evolución de la epidemia de COVID-19 de una manera fácil y rápido. Está calculadora lo ayudará a planificar los recursos en la epidemia y visibilizar el progreso durante la pandemia.
          </div>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Variable title="VARIABLES DE TRANSMISIÓN" 
                columns={{values: [
                  {
                    title: 'Población',
                    items: [
                      {
                        title: 'Tamaño de la población',
                        label: 'Personas',
                        help: 'Ayuda',
                        value: 32000000
                      },
                      {
                        title: 'Número inicial de infectados',
                        label: 'infectados',
                        help: 'Ayuda',
                        value: 6
                      } 
                    ]
                  },
                ]
                }}/>
            </Grid>
            <Grid item xs={10}>
              <Variable title="VARIABLES CLÍNICAS" 
                columns={{values: [
                  {
                    title: 'Estadísticas de mortalidad',
                    items: [
                      {
                        title: 'A1',
                        label: '%',
                        help: 'Contagio de susceptible por un infectado  [1/T]',
                        value: 50.00
                      },
                      {
                        title: 'A2',
                        label: '%',
                        help: 'Contagio de susceptible por un asintomático [1/T] (12.5 días)',
                        value: 28.00
                      },
                      {
                        title: 'A3',
                        label: '%',
                        help: 'Periodo latente de un asintomático [1/T] (5 días)',
                        value: 35.00
                      },
                      {
                        title: 'A4',
                        label: '%',
                        help: 'Periodo latente de un infectado [1/T] (5 días)',
                        value: 40.00
                      },
                    ]
                  },
                  {
                    title: 'Estadísticas de mortalidad',
                    items: [
                      {
                        title: 'A5',
                        label: '%',
                        help: 'Periodo latente de asintomático para ser un infectado [1/T] (5 días)',
                        value: 20.00
                      }, 
                      {
                        title: 'D1',
                        label: '%',
                        help: 'Muerte de un infectado [1/T]',
                        value: 0.10
                      },
                      {
                        title: 'D2',
                        label: '%',
                        help: 'Muerte de un hospitalizado [1/T]',
                        value: 0.20
                      },
                      {
                        title: 'D3',
                        label: '%',
                        help: 'Muerte de un UCI [1/T]',
                        value: 0.50
                      }
                    ]
                  },
                  {
                    title: 'Estadísticas de recuperación',
                    items: [
                      {
                        title: 'R1',
                        label: '%',
                        help: 'Recuperación de un asintomático [1/T] (30 días)',
                        value: 20.00
                      },
                      {
                        title: 'R2',
                        label: '%',
                        help: 'Recuperación de un infectado [1/T] (40 días)',
                        value: 15.00
                      },
                      {
                        title: 'R3',
                        label: '%',
                        help: 'Recuperación de un hospitalizado [1/T] (40 días)',
                        value: 7.00
                      },
                      {
                        title: 'R4',
                        label: '%',
                        help: 'Recuperación de un UCI [1/T] (20 días)',
                        value: 3.00
                      }
                    ]
                  },
                  {
                    title: 'Estadísticas de cuidados',
                    items: [
                      {
                        title: 'A6',
                        label: '%',
                        help: 'Transición de uno en cuarentena a infectado [1/T]',
                        value: 35.00
                      },
                      {
                        title: 'A7',
                        label: '%',
                        help: 'Contagio de susceptibles-cuarentena por un asintomático [1/T]',
                        value: 50.00
                      },
                      {
                        title: 'A8',
                        label: '%',
                        help: 'Hospitalizado trasladado a UCI [1/T]',
                        value: 15.00
                      },
                      {
                        title: 'A9',
                        label: '%',
                        help: 'Transición de un infectado a hospitalizado [1/T]',
                        value: 15.00
                      },
                    ]
                  },
                  {
                    title: 'Estadísticas de cuidados',
                    items: [
                      {
                        title: 'QQ',
                        label: '%',
                        help: 'Estado de cuarentena',
                        value: 15.00
                      } 
                    ]
                  }
                ]
                }}/>
            </Grid>
          </Grid> 
          <LineAreaGraphic 
            width={980}
            height={360}
            margin={{
              top: 10,
              left: 230,
              right: 10,
              bottom: 30
            }}
          />
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default DashboardPage
