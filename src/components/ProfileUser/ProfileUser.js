import React, { useState, useContext, useEffect, useRef } from 'react'
import { useResource } from 'react-request-hook'
import {
  Input,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Box, Container
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../../middleware/api'
import useErrorApi from '../../hooks/use-error-api'
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import useLocalStorage from "../../hooks/local-storage";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    margin: "auto"
  },
  input: {
    display: "none"
  },
  large: {
    margin: "auto",
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
  center:{
    margin: "auto",
  },
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
}))

const ProfileUser = (props) => {

  const classes = useStyles()
  const [image, setImage] = useState(null);

  const [user, updateUser] = useResource(api.updateUser)
  const [avatar, getAvatarUser] = useResource(api.getAvatarUser)
  const [stateError, AlertError, setData] = useErrorApi(user)
  const [token, setToken] = useLocalStorage('token', null)
  const [email, setEmail] = useLocalStorage('email', null)
  const [openConfirmation, setConfirmation] = useState(false)
  const [messageConfirmation, setMessageConfirmation] = useState('')

  useEffect(() => {
    if(avatar.data && avatar.data.image){
      setImage('data:image/jpg;base64,' + avatar.data.image);
    }
  }, [avatar])

  useEffect(() => {
    getAvatarUser(token);
  }, []);

  useEffect(() => {
    setData(user);
    if(user.data && user.data.message){
      setConfirmation(true)
      setMessageConfirmation(user.data.message)
    }
  }, [user]);

  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file){
      reader.readAsDataURL(file);
      reader.onloadend = function(e) {
        setImage(reader.result);
      }
    }else{
      setImage(null);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmation(false)
  }

  const updateProfile = event => {
    event.preventDefault();
    updateUser(email, image);
  }

  return (
    <>
    <Container component='main' maxWidth='lg'>
      <Header />
      <div className={classes.sectionContainer}>
        <NavBar />
        <Box className={classes.sectionContent}>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs={12}>
              <Card className={classes.root} >
                <CardActionArea>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadClick}
                  />
                  <CardMedia
                    className={classes.media}
                    src={image}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <label htmlFor="contained-button-file" className={classes.button}>
                      <Fab component="span">
                        <AddPhotoAlternateIcon />
                      </Fab>
                    </label>
                    <Avatar alt="User Profile" src={image} className={classes.large} />
                    <Typography gutterBottom variant="h5" component="h2">
                      Mi Perfil
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" >
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" variant="contained" disabled={image === null} className={classes.center} onClick={updateProfile}>
                    Guardar
                  </Button>
                </CardActions>
              </Card>
              <AlertError />
              <>
                <Snackbar open={openConfirmation} autoHideDuration={6000} onClose={handleCloseConfirmation}>
                  <Alert onClose={handleCloseConfirmation} severity='success'>
                    {messageConfirmation}
                  </Alert>
                </Snackbar>
              </>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
    </>
  )
}

ProfileUser.propTypes = {}

ProfileUser.defaultProps = {}

export default ProfileUser
