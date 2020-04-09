import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation } from 'react-navi'
import { Input, Button, NativeSelect, FormControl, InputLabel, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      border: '1px solid #ccc',
      borderRadius: 12,
      marginTop: 22,
    },
    '& .MuiInputBase-input': {
      height: '2em',
      padding: '6px 8px 7px',
      '&:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 30px white inset !important',
        borderRadius: 'inherit'
      },
    },
    '& .MuiInputLabel-formControl': {
      color: '#56cdcc',
      fontWeight: 500,
    },
    '& .MuiCheckbox-root': {
      padding: 0,
    }
  },
  button: {
    borderRadius: 16,
    fontSize: 12,
    padding: '7px 30px',
    minWidth: 150,
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
    backgroundColor: '#56cdcc',
    color: '#FFF',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const RegisterUser = () => {
  const { dispatch } = useContext(StateContext)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ institution, setInstitution ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordRepeat, setPasswordRepeat ] = useState('')
  const [ registerFailed, setRegisterFailed ] = useState(false)
  const [ departmentId, setDepartmentId] = useState(0)
  const [ provinceId, setProvinceId] = useState(0)
  const [ districtId, setDistrictId] = useState(0)

  const [ user, registerUser ] = useResource(api.registerUser)
  const [ departments, getDepartments ] = useResource(api.getDepartments)
  const [ provinces, getProvinces ] = useResource(api.getProvinces)
  const [ districts, getDistricts ] = useResource(api.getDistricts)

  const classes = useStyles()
  const navigation = useNavigation()

  useEffect(() => getDepartments(), [])

  useEffect(() => getProvinces(departmentId), [departmentId])

  useEffect(() => getDistricts(provinceId), [provinceId])

  useEffect(() => {
    if (user && user.data) {
      setRegisterFailed(false)
      dispatch({ type: 'REGISTER', email: user.data.email })
      navigation.navigate('/unconfirmed_account') 

    }
    if (user && user.error) {
      console.log(user.error.data.message)
      setRegisterFailed(true)
    }
  }, [user])

  function handleFirstName (e) {
    setFirstName(e.target.value)
  }

  function handleLastName (e) {
    setLastName(e.target.value)
  }

  function handleInstitution (e) {
    setInstitution(e.target.value)
  }

  function handleEmail (e) {
    setEmail(e.target.value)
  }

  function handlePassword (e) {
    setPassword(e.target.value)
  }

  function handlePasswordRepeat (e) {
    setPasswordRepeat(e.target.value)
  }

  function handleDistrict (e) {
    setDistrictId(e.target.value)
  }

  function handleDepartment (e) {
    setDepartmentId(e.target.value)
  }

  function handleProvince (e) {
    setProvinceId(e.target.value)
  }

  return (
    <form className={classes.form} data-testid="RegisterUser" onSubmit={e => { e.preventDefault(); registerUser(firstName, lastName, institution, email, password, departmentId, provinceId, districtId)}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="first_name" shrink>Nombres</InputLabel>
            <Input id="first_name" type="text" value={firstName} onChange={handleFirstName} required autoFocus disableUnderline={true}/>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="last_name" shrink>Apellidos</InputLabel>
            <Input id="last_name" type="text" value={lastName} onChange={handleLastName} required disableUnderline={true}/>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="institution" shrink>Institución</InputLabel>
        <Input id="institution" type="text" value={institution} onChange={handleInstitution} required disableUnderline={true}/>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel shrink htmlFor="department-label">
              Departamento
            </InputLabel>
            <NativeSelect
              value={departmentId}
              onChange={handleDepartment}
              inputProps={{
                name: 'department',
                id: 'department-label',
              }}
            >
              <option value="">Seleccione</option>
              {departments.data && departments.data.departments.map((department, index)=> <option value={department.id} key={index}>{department.name}</option>) }
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel shrink htmlFor="province-label">
              Provincia
            </InputLabel>
            <NativeSelect
              value={provinceId}
              onChange={handleProvince}
              inputProps={{
                name: 'province',
                id: 'province-label',
              }}
            >
              <option value="">Seleccione</option>
              {provinces.data && provinces.data.provinces.map((province, index)=> <option value={province.id} key={index}>{province.name}</option>) }
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl margin="normal" fullWidth>
        <InputLabel shrink htmlFor="district-label">
          Districto
        </InputLabel>
        <NativeSelect
          value={districtId}
          onChange={handleDistrict}
          inputProps={{
            name: 'district',
            id: 'district-label',
          }}
        >
          <option value="">Seleccione</option>
          {districts.data && districts.data.districts.map((district, index)=> <option value={district.id} key={index}>{district.name}</option>) }
        </NativeSelect>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="email" shrink>Email</InputLabel>
        <Input id="email" type="email" value={email} onChange={handleEmail} required disableUnderline={true}/>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="password" shrink>contraseña</InputLabel>
        <Input id="password" type="password" value={password} onChange={handlePassword} required disableUnderline={true}/>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="password-repeat" shrink>Repetir contraseña</InputLabel>
        <Input id="password-repeat" type="password" value={passwordRepeat} onChange={handlePasswordRepeat} required disableUnderline={true}/>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={password !== passwordRepeat}
        className={`${classes.button} ${classes.submit}`}
      >
        Registrarse
      </Button>
    </form>
  )
}

RegisterUser.propTypes = {}

RegisterUser.defaultProps = {}

export default RegisterUser
