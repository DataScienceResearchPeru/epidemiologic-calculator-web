import React from 'react'
import { Link } from 'react-navi'
import { Container, Grid, Box, Divider, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FacebookIcon from '../components/icons/FacebookIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import GoogleIcon from '../components/icons/GoogleIcon'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Login from '../components/Login/Login'

const useStyles = makeStyles((theme) => ({
  boxContent: {
    borderRadius: 17,
    backgroundColor: '#5ad6d6',
    padding: '80px 100px',
    minHeight: '14em',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  boxInfo: {
    color: '#FFF',
    width: 380,
    '& h1': {
      fontSize: '1.8em',
      fontWeight: 500,
    }
  },
  boxRight: {
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 17,
    padding: '30px 30px 52px',
  },
  boxForm: {
    maxWidth: 380,
  },
  btnTop: {
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 50,
    '& a': {
      textDecoration: 'none',
      fontWeight: 600,
      lineHeight: '1.75',
      margin: 0,
      borderRadius: 16,
      textAlign: 'center',
      padding: '7px 30px',
    }
  },
  btnLeft:{
    border: '1px solid #ebebeb',
    backgroundColor: '#ebebeb',
    color: '#56cdcc',
  },
  btnRight: {
    border: '1px solid #56cdcc',
    backgroundColor: '#56cdcc',
    color: '#FFF',
  },
  hr: {
    border: '1px solid #56cdcc',
    width: '100%',
    height: 0,
  },
  circle: {
    height: 10,
    width: 10,
    backgroundColor: '#56cdcc',
    borderRadius: '100%',
    boxShadow: 'inset 0px 0px 0px 2px #FFF',
    border: '10px solid #56cdcc',
    display: 'inline-block',
    marginTop: -15,
    marginBottom: 38,
  },
  socialMedia:{
    '& > *': {
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      minWidth: 36,
      minHeight: 36,
      borderRadius: '50%',
      padding: 5,
      color: '#404040',
    }
  },
}))
  
const HomePage = () => {
  const classes = useStyles()
  
  return (
    <React.Fragment>
      <Container component="main" maxWidth="lg">
        <Header />
        <Box className={classes.boxContent}> 
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.boxInfo}>
                <h1>BIENVENIDO</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.boxRight}>
                <div className={classes.btnTop}>
                  <Link href={'/register'} className={classes.btnLeft}>Regístrate</Link>
                  <Link href={'/'} className={classes.btnRight}>iniciar sesión</Link>
                </div>

                <div className={classes.boxForm}>
                  <Login />
                  <Divider className={classes.hr} />
                  <div className={classes.circle}></div>

                  <div className={classes.socialMedia}>
                    <Button variant="outlined"><GoogleIcon /></Button>
                    <Button variant="outlined"><FacebookIcon /></Button>
                    <Button variant="outlined"><LinkedinIcon /></Button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

HomePage.propTypes = {}

HomePage.defaultProps = {}

export default HomePage
