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
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Variable title="VARIABLES DE TRANSMISIÓN" 
                columns={{values: [
                  {
                    title: 'Población',
                    items: [
                      {
                        title: 'Tamaño de la población',
                        label: 'Personas',
                        help: 'Ayuda',
                        value: 8575000
                      },
                      {
                        title: 'Número inicial de infectados',
                        label: 'infectados',
                        help: 'Ayuda',
                        value: 4
                      } 
                    ]
                  },
                  {
                    title: 'Reproducción Básica RO',
                    items: [
                      {
                        title: 'Medida de contagio',
                        label: 'infectados',
                        help: 'Ayuda',
                        value: 2.2
                      },
                    ]
                  },
                  {
                    title: 'Tiempo de transmisión',
                    items: [
                      {
                        title: 'Tamaño de la población',
                        label: 'días',
                        help: 'Ayuda',
                        value: 8575000
                      },
                      {
                        title: 'Tiempo de infección del paciente',
                        label: 'días',
                        help: 'Ayuda',
                        value: 6.9
                      } 
                    ]
                  }
                ]
                }}/>
            </Grid>
            <Grid item xs={6}>
              <Variable title="VARIABLES CLÍNICAS" 
                columns={{values: [
                  {
                    title: 'Estadísticas de mortalidad',
                    items: [
                      {
                        title: 'Tasa de letalidad',
                        label: '%',
                        help: 'Ayuda',
                        value: 2.00
                      },
                      {
                        title: 'Tiempo desde el final de la incubación hasta la muerte',
                        label: 'días',
                        help: 'Ayuda',
                        value: 32
                      } 
                    ]
                  },
                  {
                    title: 'Tiempos de recuperación',
                    items: [
                      {
                        title: 'Duración de la estancia hospitalaria',
                        label: 'días',
                        help: 'Ayuda',
                        value: 28.6
                      },
                      {
                        title: 'Tiempo de recuperación para casos leves',
                        label: 'días',
                        help: 'Ayuda',
                        value: 11.1
                      }
                    ]
                  },
                  {
                    title: 'Estadísticas de cuidados',
                    items: [
                      {
                        title: 'Tasa de hospitalización',
                        label: '%',
                        help: 'Ayuda',
                        value: 20.00
                      },
                      {
                        title: 'Tiempo de hospitalización',
                        label: '%',
                        help: 'Ayuda',
                        value: 5
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
