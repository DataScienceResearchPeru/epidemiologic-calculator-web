import React from 'react'
import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'

const useStyles = makeStyles((theme) => ({
  sectionContent: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    padding: '33px 67px',
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
  }
}))

const DashboardPage = () => {
  const classes = useStyles()

  return (
    <>
      <Container component='main' maxWidth='lg'>
        <Header />
        <div className={classes.sectionContainer}>
          <NavBar />
          <Box className={classes.sectionContent}>
            <div className={classes.information}>
              Somos una calculadora epidemiológica que permite analizar el efecto de la cuarentena sobre la cantidad de infectados,  utilizando el modelo compartimental SEIR, el cual es extremadamente útil para el estudio de enfermedades infecciosas, como el COVID-19. Este modelo divide la población total de individuos en cuatro subpoblaciones:
              <ul>
                <li><strong>Susceptibles (S):</strong> Personas sin inmunidad a la enfermedad. Estas personas pueden ser infectadas al entrar en contacto con individuos enfermos.</li>
                <li><strong>Expuestos (E):</strong> Personas quienes están en período de incubación de la enfermedad. Estas tienen el virus en su organismo, su capacidad de infectar a otros es baja.</li>
                <li><strong>Infectados (I):</strong> Personas contagiadas quienes presentan síntomas.</li>
                <li><strong>Recuperados (R):</strong> Personas que ya no son capaces de transmitir la enfermedad infecciosa.</li>
              </ul>
            </div>
          </Box>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default DashboardPage
