import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation } from 'react-navi'
import { Button, Select, FormControl, InputLabel, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      borderRadius: 10,
    },
    '& .MuiOutlinedInput-input': {
      padding: '14.5px 14px',
    },
    '& .MuiInputLabel-formControl': {
      color: '#56cdcc',
      fontSize: '0.9rem',
      fontWeight: 400
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 16px)'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& .MuiCheckbox-root': {
      padding: 0,
    }
  },
  submit: {
    borderRadius: 16,
    fontSize: 12,
    padding: '7px 30px',
    minWidth: 150,
    margin: theme.spacing(6, 0, 2),
    backgroundColor: '#56cdcc',
    color: '#FFF',
  },
}))

const RegisterUser = () => {
  const { dispatch } = useContext(StateContext)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ institution, setInstitution ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ departmentId, setDepartmentId] = useState(0)
  const [ provinceId, setProvinceId] = useState(0)
  const [ districtId, setDistrictId] = useState(0)
  const [ registerFailed, setRegisterFailed ] = useState(false)

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
      
      <TextField id="first_name" label="Nombres" 
        variant="outlined"
        margin="normal"
        value={firstName}
        onChange={handleFirstName}
        fullWidth
        required />

      <TextField id="last_name" label="Apellidos" 
        variant="outlined"
        margin="normal"
        value={lastName}
        onChange={handleLastName}
        required
        fullWidth />

      <TextField id="institution" label="Institución" 
        variant="outlined"
        margin="normal"
        value={institution}
        onChange={handleInstitution}
        required
        fullWidth />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="department-label">
              Departamento
            </InputLabel>
            <Select
              native
              value={departmentId}
              onChange={handleDepartment}
              inputProps={{
                name: 'department',
                id: 'department-label',
              }}
            > 
              <option aria-label="None" value="" />
              {departments.data && departments.data.departments.map((department, index)=> <option value={department.id} key={index}>{department.name}</option>) }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="province-label">
              Provincia
            </InputLabel>
            <Select
              native
              value={provinceId}
              onChange={handleProvince}
              inputProps={{
                name: 'province',
                id: 'province-label',
              }}
            >
              <option aria-label="None" value="" />
              {provinces.data && provinces.data.provinces.map((province, index)=> <option value={province.id} key={index}>{province.name}</option>) }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="district-label">
          Districto
        </InputLabel>
        <Select
          native
          value={districtId}
          onChange={handleDistrict}
          inputProps={{
            name: 'district',
            id: 'district-label',
          }}
        >
          <option aria-label="None" value="" />
          {districts.data && districts.data.districts.map((district, index)=> <option value={district.id} key={index}>{district.name}</option>) }
        </Select>
      </FormControl>

      <TextField id="email" label="Correo electrónico" 
        variant="outlined"
        margin="normal"
        type="email"
        value={email}
        onChange={handleEmail}
        required
        fullWidth />
      
      <TextField id="password" label="Contraseña" 
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePassword}
        required
        fullWidth />

      <Button
        type="submit"
        variant="contained"
        className={classes.submit}
      >
        Registrarse
      </Button>
    </form>
  )
}

RegisterUser.propTypes = {}

RegisterUser.defaultProps = {}

export default RegisterUser
