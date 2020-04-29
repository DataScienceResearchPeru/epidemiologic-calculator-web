import React, { useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'
import { Container, Box, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../components/Footer/Footer'
import LineGraphic from '../components/LineGraphic/LineGraphic'
import { api } from '../middleware/api'

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
    marginBottom: 31
  },
  LineGraphic: {
    boxShadow: '0px 1px 6px #00000029',
    borderRadius: 12,
    padding: '16px 18px 22px 24px',
    marginTop: theme.spacing(3.1),
    justifyContent: 'center',
    display: 'flex'
  }
}))

const DashboardPage = () => {
  const classes = useStyles()
  const [population, setPopulation] = useState(32000000)
  const [infected, setInfected] = useState(6)
  const [a1, setA1] = useState(50)
  const [a2, setA2] = useState(28)
  const [a3, setA3] = useState(35)
  const [a4, setA4] = useState(40)
  const [a5, setA5] = useState(20)
  const [d1, setD1] = useState(0.1)
  const [d2, setD2] = useState(0.2)
  const [d3, setD3] = useState(0.5)
  const [r1, setR1] = useState(20)
  const [r2, setR2] = useState(15)
  const [r3, setR3] = useState(7)
  const [r4, setR4] = useState(3)
  const [a6, setA6] = useState(35)
  const [a7, setA7] = useState(50)
  const [a8, setA8] = useState(15)
  const [a9, setA9] = useState(30)
  const [qq, setQQ] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [response] = useResource(api.getDataSeaichurd, [population, infected, a1, a2, a3, a4, a5, d1, d2, d3, r1, r2, r3, r4, a6, a7, a8, a9, qq])

  useEffect(() => {
    if (response && response.data) {
      setIsLoading(false)
      setData(response.data)
    }
  }, [response])

  const changePopulation = (val) => {
    setPopulation(val)
  }

  const changeInfected = (val) => {
    setInfected(val)
  }

  const changeA1 = (val) => {
    setA1(val)
  }

  const changeA2 = (val) => {
    setA2(val)
  }

  const changeA3 = (val) => {
    setA3(val)
  }

  const changeA4 = (val) => {
    setA4(val)
  }

  const changeA5 = (val) => {
    setA5(val)
  }

  const changeD1 = (val) => {
    setD1(val)
  }

  const changeD2 = (val) => {
    setD2(val)
  }

  const changeD3 = (val) => {
    setD3(val)
  }

  const changeR1 = (val) => {
    setR1(val)
  }

  const changeR2 = (val) => {
    setR2(val)
  }

  const changeR3 = (val) => {
    setR3(val)
  }

  const changeR4 = (val) => {
    setR4(val)
  }

  const changeA6 = (val) => {
    setA6(val)
  }

  const changeA7 = (val) => {
    setA7(val)
  }

  const changeA8 = (val) => {
    setA8(val)
  }

  const changeA9 = (val) => {
    setA9(val)
  }

  const changeQQ = (val) => {
    setQQ(val)
  }

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Box className={classes.sectionContent}>
          <div className={classes.information}>
            Simula escenarios de evolución de la epidemia de COVID-19 de una manera fácil y rápido. Está calculadora lo ayudará a planificar los recursos en la epidemia y visibilizar el progreso durante la pandemia.
          </div>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Variable
                title='VARIABLES DE TRANSMISIÓN'
                columns={{
                  values: [
                    {
                      title: 'Población',
                      items: [
                        {
                          title: 'Tamaño de la población',
                          label: 'Personas',
                          help: 'Ayuda',
                          value: 32000000,
                          changeValue: changePopulation
                        },
                        {
                          title: 'Número inicial de infectados',
                          label: 'infectados',
                          help: 'Ayuda',
                          value: 6,
                          changeValue: changeInfected
                        }
                      ]
                    }
                  ]
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <Variable
                title='VARIABLES CLÍNICAS'
                columns={{
                  values: [
                    {
                      title: 'Estadísticas de mortalidad',
                      items: [
                        {
                          title: 'A1',
                          label: '%',
                          help: 'Contagio de susceptible por un infectado  [1/T]',
                          value: 50.00,
                          changeValue: changeA1
                        },
                        {
                          title: 'A2',
                          label: '%',
                          help: 'Contagio de susceptible por un asintomático [1/T] (12.5 días)',
                          value: 28.00,
                          changeValue: changeA2
                        },
                        {
                          title: 'A3',
                          label: '%',
                          help: 'Periodo latente de un asintomático [1/T] (5 días)',
                          value: 35.00,
                          changeValue: changeA3
                        },
                        {
                          title: 'A4',
                          label: '%',
                          help: 'Periodo latente de un infectado [1/T] (5 días)',
                          value: 40.00,
                          changeValue: changeA4
                        }
                      ]
                    },
                    {
                      title: 'Estadísticas de mortalidad',
                      items: [
                        {
                          title: 'A5',
                          label: '%',
                          help: 'Periodo latente de asintomático para ser un infectado [1/T] (5 días)',
                          value: 20.00,
                          changeValue: changeA5
                        },
                        {
                          title: 'D1',
                          label: '%',
                          help: 'Muerte de un infectado [1/T]',
                          value: 0.10,
                          changeValue: changeD1
                        },
                        {
                          title: 'D2',
                          label: '%',
                          help: 'Muerte de un hospitalizado [1/T]',
                          value: 0.20,
                          changeValue: changeD2
                        },
                        {
                          title: 'D3',
                          label: '%',
                          help: 'Muerte de un UCI [1/T]',
                          value: 0.50,
                          changeValue: changeD3
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
                          value: 20.00,
                          changeValue: changeR1
                        },
                        {
                          title: 'R2',
                          label: '%',
                          help: 'Recuperación de un infectado [1/T] (40 días)',
                          value: 15.00,
                          changeValue: changeR2
                        },
                        {
                          title: 'R3',
                          label: '%',
                          help: 'Recuperación de un hospitalizado [1/T] (40 días)',
                          value: 7.00,
                          changeValue: changeR3
                        },
                        {
                          title: 'R4',
                          label: '%',
                          help: 'Recuperación de un UCI [1/T] (20 días)',
                          value: 3.00,
                          changeValue: changeR4
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
                          value: 35.00,
                          changeValue: changeA6
                        },
                        {
                          title: 'A7',
                          label: '%',
                          help: 'Contagio de susceptibles-cuarentena por un asintomático [1/T]',
                          value: 50.00,
                          changeValue: changeA7
                        },
                        {
                          title: 'A8',
                          label: '%',
                          help: 'Hospitalizado trasladado a UCI [1/T]',
                          value: 15.00,
                          changeValue: changeA8
                        },
                        {
                          title: 'A9',
                          label: '%',
                          help: 'Transición de un infectado a hospitalizado [1/T]',
                          value: 30.00,
                          changeValue: changeA9
                        }
                      ]
                    },
                    {
                      title: 'Estadísticas de cuidados',
                      items: [
                        {
                          title: 'QQ',
                          label: '%',
                          help: 'Estado de cuarentena',
                          value: 0,
                          changeValue: changeQQ
                        }
                      ]
                    }
                  ]
                }}
              />
            </Grid>
          </Grid>
          <Box className={classes.LineGraphic}>
            {
              isLoading
                ? <CircularProgress />
                : <LineGraphic
                  data={data}
                  width={980}
                  height={360}
                  margin={{
                    top: 10,
                    left: 230,
                    right: 10,
                    bottom: 30
                  }}
                  grid='full'
                />
            }
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardPage
