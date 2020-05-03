import React, { useState, useContext, useEffect, useRef } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation, Link } from 'react-navi'
import { Input, Button, Checkbox, FormControlLabel, FormControl, InputLabel, InputAdornment, IconButton, Grid } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'
import useErrorApi from '../../hooks/use-error-api'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '550px',
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
  }
}))

const ProfileUser = (props) => {

  const classes = useStyles()
  const [image, setImage] = useState(null);

  const [user, updateUser] = useResource(api.updateUser)
  const [stateError, AlertError, setData] = useErrorApi(user)

  useEffect(() => {
    console.log(user);
  }, [user])

  const handleUploadClick = event => {
    console.log();
    var file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    if (file){
      reader.readAsDataURL(file);
      reader.onloadend = function(e) {
        console.log(reader.result);
        setImage(reader.result);
      }
    }else{
      setImage(null);
    }
  };

  const updateProfile = event => {
      console.log('update user')
      event.preventDefault();
      const email = 'emanuellpp@gmail.com';
      updateUser(email, image);
  }

  return (
    <div>
      <Card className={classes.root}>
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
            <Avatar alt="Remy Sharp" src={image} className={classes.large} />
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
    </div>
  )
}

ProfileUser.propTypes = {}

ProfileUser.defaultProps = {}

export default ProfileUser
