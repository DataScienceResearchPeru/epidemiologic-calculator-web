import React, { useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'
import {
  Box,
  Grid,
  CircularProgress,
  Select,
  FormControl,
  MenuItem,
  Container,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'
import Variable from '../components/Variable/Variable'
import LineGraphic from '../components/LineGraphic/LineGraphic'
import { api } from '../middleware/api'

const useStyles = makeStyles((theme) => ({
  sectionContent: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: '33px 67px',
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    boxShadow: '0px 2px 10px #00000029',
    zIndex: 2,
    marginLeft: -11
  },
  sectionContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    boxSizing: 'border-box'
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
    display: 'flex',
    textAlign: 'center',
    '& .MuiCircularProgress-colorPrimary': {
      color: '#2DB2B2'
    },
    '& .line-container': {
      textAlign: 'center'
    }
  },
  formControl: {
    '& .MuiInput-underline:before, .MuiInput-underline:after, .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 0
    },
    '& .MuiSelect-select': {
      color: '#404040',
      fontSize: '15px',
      fontWeight: 320
    },
    '& .MuiInputBase-formControl': {
      boxShadow: '0px 1px 3px #00000029',
      borderRadius: 4,
      padding: '1px 10px'
    }
  },
  input: {
    display: 'none'
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
    '& .MuiFormControl-root': {
      marginRight: 15
    },
    '& .MuiButton-root': {
      fontWeight: 'normal'
    },
    '& .MuiButton-outlined': {
      border: 0,
      boxShadow: '0px 1px 3px #00000029'
    }
  }
}))

const ComparativePage = () => {
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
  const [duration, setDuration] = useState(120)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [response] = useResource(api.getDataSeaichurd, [
    population,
    infected,
    duration,
    a1,
    a2,
    a3,
    a4,
    a5,
    d1,
    d2,
    d3,
    r1,
    r2,
    r3,
    r4,
    a6,
    a7,
    a8,
    a9,
    qq
  ])

  useEffect(() => {
    if (response && response.data) {
      setIsLoading(false)
      setData(response.data)
    }
  }, [response])

  const handlePopulation = (val) => {
    setPopulation(val)
  }

  const handleInfected = (val) => {
    setInfected(val)
  }

  const handleA1 = (val) => {
    setA1(val)
  }

  const handleA2 = (val) => {
    setA2(val)
  }

  const handleA3 = (val) => {
    setA3(val)
  }

  const handleA4 = (val) => {
    setA4(val)
  }

  const handleA5 = (val) => {
    setA5(val)
  }

  const handleD1 = (val) => {
    setD1(val)
  }

  const handleD2 = (val) => {
    setD2(val)
  }

  const handleD3 = (val) => {
    setD3(val)
  }

  const handleR1 = (val) => {
    setR1(val)
  }

  const handleR2 = (val) => {
    setR2(val)
  }

  const handleR3 = (val) => {
    setR3(val)
  }

  const handleR4 = (val) => {
    setR4(val)
  }

  const handleA6 = (val) => {
    setA6(val)
  }

  const handleA7 = (val) => {
    setA7(val)
  }

  const handleA8 = (val) => {
    setA8(val)
  }

  const handleA9 = (val) => {
    setA9(val)
  }

  const handleQQ = (val) => {
    setQQ(val)
  }

  const handleDuration = (e) => {
    setDuration(e.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <div className={classes.sectionContainer}>
          <NavBar />
          <Box className={classes.sectionContent}>
            <div className={classes.information}>
              Simula escenarios de evolución de la epidemia de COVID-19 de una manera fácil y rápido. Está calculadora lo ayudará a planificar los recursos en la epidemia y visibilizar el progreso durante la pandemia.
            </div>
            <Grid container>
              <Grid item xs={12}>
                <Variable
                  title='VARIABLES DE TRANSMISIÓN Y CLÍNICAS'
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
                            handleChangeValue: handlePopulation
                          },
                          {
                            title: 'Número inicial de infectados',
                            label: 'infectados',
                            help: 'Ayuda',
                            value: 6,
                            handleChangeValue: handleInfected
                          }
                        ]
                      },
                      {
                        title: 'Estadísticas de mortalidad',
                        items: [
                          {
                            title: 'A1',
                            label: '%',
                            help: 'Contagio de susceptible por un infectado  [1/T]',
                            value: 50.0,
                            handleChangeValue: handleA1
                          },
                          {
                            title: 'A2',
                            label: '%',
                            help:
                            'Contagio de susceptible por un asintomático [1/T] (12.5 días)',
                            value: 28.0,
                            handleChangeValue: handleA2
                          },
                          {
                            title: 'A3',
                            label: '%',
                            help: 'Periodo latente de un asintomático [1/T] (5 días)',
                            value: 35.0,
                            handleChangeValue: handleA3
                          },
                          {
                            title: 'A4',
                            label: '%',
                            help: 'Periodo latente de un infectado [1/T] (5 días)',
                            value: 40.0,
                            handleChangeValue: handleA4
                          }
                        ]
                      },
                      {
                        title: 'Estadísticas de mortalidad',
                        items: [
                          {
                            title: 'A5',
                            label: '%',
                            help:
                            'Periodo latente de asintomático para ser un infectado [1/T] (5 días)',
                            value: 20.0,
                            handleChangeValue: handleA5
                          },
                          {
                            title: 'D1',
                            label: '%',
                            help: 'Muerte de un infectado [1/T]',
                            value: 0.1,
                            handleChangeValue: handleD1
                          },
                          {
                            title: 'D2',
                            label: '%',
                            help: 'Muerte de un hospitalizado [1/T]',
                            value: 0.2,
                            handleChangeValue: handleD2
                          },
                          {
                            title: 'D3',
                            label: '%',
                            help: 'Muerte de un UCI [1/T]',
                            value: 0.5,
                            handleChangeValue: handleD3
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
                            value: 20.0,
                            handleChangeValue: handleR1
                          },
                          {
                            title: 'R2',
                            label: '%',
                            help: 'Recuperación de un infectado [1/T] (40 días)',
                            value: 15.0,
                            handleChangeValue: handleR2
                          },
                          {
                            title: 'R3',
                            label: '%',
                            help: 'Recuperación de un hospitalizado [1/T] (40 días)',
                            value: 7.0,
                            handleChangeValue: handleR3
                          },
                          {
                            title: 'R4',
                            label: '%',
                            help: 'Recuperación de un UCI [1/T] (20 días)',
                            value: 3.0,
                            handleChangeValue: handleR4
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
                            value: 35.0,
                            handleChangeValue: handleA6
                          },
                          {
                            title: 'A7',
                            label: '%',
                            help:
                            'Contagio de susceptibles-cuarentena por un asintomático [1/T]',
                            value: 50.0,
                            handleChangeValue: handleA7
                          },
                          {
                            title: 'A8',
                            label: '%',
                            help: 'Hospitalizado trasladado a UCI [1/T]',
                            value: 15.0,
                            handleChangeValue: handleA8
                          },
                          {
                            title: 'A9',
                            label: '%',
                            help: 'Transición de un infectado a hospitalizado [1/T]',
                            value: 30.0,
                            handleChangeValue: handleA9
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
                            handleChangeValue: handleQQ
                          }
                        ]
                      }
                    ]
                  }}
                />
              </Grid>
            </Grid>
            <Box className={classes.LineGraphic}>
              <Grid container>
                <Grid item xs={12}>
                  <div className={classes.controls}>
                    <FormControl>
                      <input accept='.csv' className={classes.input} id='button-file' type='file' />
                      <label htmlFor='button-file'>
                        <Button
                          variant='outlined'
                          component='span'
                          startIcon={<CloudUploadIcon />}
                        >
                          Cargar datos
                        </Button>
                      </label>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId='duration-label'
                        id='duration-select'
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={duration}
                        onChange={handleDuration}
                      >
                        <MenuItem value={120}>Últimos 120 días</MenuItem>
                        <MenuItem value={160}>Últimos 160 días</MenuItem>
                        <MenuItem value={200}>Últimos 200 días</MenuItem>
                        <MenuItem value={250}>Últimos 250 días</MenuItem>
                        <MenuItem value={300}>Últimos 300 días</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <LineGraphic
                      data={data}
                      width={800}
                      height={360}
                      margin={{
                        top: 10,
                        left: 230,
                        right: 10,
                        bottom: 30
                      }}
                      grid='full'
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default ComparativePage
