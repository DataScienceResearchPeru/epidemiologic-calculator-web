import React, { useState, useContext, useEffect, useRef } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation } from 'react-navi'
import { Button, Select, FormControl, InputLabel, Grid, TextField, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { StateContext } from '../../contexts'
import { api } from '../../middleware/api'
import useErrorApi from '../../hooks/use-error-api'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif',
    '& .MuiInputBase-root': {
      borderRadius: 10
    },
    '& .MuiOutlinedInput-input': {
      padding: '14.5px 14px'
    },
    '& .MuiInputLabel-formControl': {
      color: '#33CCCC',
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
      padding: 0
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: 5
    }
  },
  submit: {
    borderRadius: 15,
    fontSize: 12,
    padding: '7px 27px',
    minWidth: 150,
    margin: theme.spacing(4, 0, 2),
    backgroundColor: '#33CCCC',
    color: '#FFF',
    boxShadow: '0px 2px 4px #00000029'
  }
}))

const RegisterUser = () => {
  const { dispatch } = useContext(StateContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [institution, setInstitution] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [departmentId, setDepartmentId] = useState(0)
  const [provinceId, setProvinceId] = useState(0)
  const [districtId, setDistrictId] = useState(0)
  const [errorValidation, setErrorValidation] = useState({})

  const [user, registerUser] = useResource(api.registerUser)
  const [departments, getDepartments] = useResource(api.getDepartments)
  const [provinces, getProvinces] = useResource(api.getProvinces)
  const [districts, getDistricts] = useResource(api.getDistricts)

  const [stateError, AlertError, setData] = useErrorApi(user)

  const classes = useStyles()
  const navigation = useRef(useNavigation())

  useEffect(() => getDepartments(), [getDepartments])

  useEffect(() => getProvinces(departmentId), [getProvinces, departmentId])

  useEffect(() => getDistricts(provinceId), [getDistricts, provinceId])

  useEffect(() => {
    setData(user)
    if (user && user.data && !stateError) {
      dispatch({ type: 'REGISTER', email: user.data.email })
      navigation.current.navigate('/unconfirmed_account')
    }
  }, [user, dispatch, stateError, setData])

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

  function updateErrorValidation (name, isInvalid) {
    const error = {}
    error[name] = isInvalid
    setErrorValidation({ ...errorValidation, ...error })
  }

  function handleOnBlur (e) {
    const name = e.target.name
    switch (name) {
      case 'provinceId':
        if (provinceId === 0) {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'districtId':
        if (districtId === 0) {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'departmentId':
        if (departmentId === 0) {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'firstName':
        if (firstName === '') {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'lastName':
        if (lastName === '') {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'institution':
        if (institution === '') {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'email':
        if (email === '') {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      case 'password':
        if (password === '') {
          updateErrorValidation(name, true)
        } else {
          updateErrorValidation(name, false)
        }
        break
      default:
        break
    }
  }

  return (
    <form className={classes.form} data-testid='RegisterUser' onSubmit={e => { e.preventDefault(); registerUser(firstName, lastName, institution, email, password, departmentId, provinceId, districtId) }}>

      <TextField
        id='first_name' label='Nombres'
        variant='outlined'
        margin='normal'
        name='firstName'
        error={errorValidation.firstName}
        helperText={errorValidation.firstName ? 'El nombre es obligatorio' : ' '}
        value={firstName}
        onChange={handleFirstName}
        onBlur={handleOnBlur}
        fullWidth
        required
      />

      <TextField
        id='last_name' label='Apellidos'
        variant='outlined'
        margin='normal'
        name='lastName'
        error={errorValidation.lastName}
        helperText={errorValidation.lastName ? 'El apellido es obligatorio' : ' '}
        value={lastName}
        onChange={handleLastName}
        onBlur={handleOnBlur}
        required
        fullWidth
      />

      <TextField
        id='institution' label='Institución'
        variant='outlined'
        margin='normal'
        name='institution'
        error={errorValidation.institution}
        helperText={errorValidation.institution ? 'La institución es obligatoria' : ' '}
        value={institution}
        onChange={handleInstitution}
        onBlur={handleOnBlur}
        required
        fullWidth
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl margin='normal' fullWidth error={errorValidation.departmentId}>
            <InputLabel htmlFor='department-label'>
              Departamento
            </InputLabel>
            <Select
              native
              value={departmentId}
              onChange={handleDepartment}
              onBlur={handleOnBlur}
              inputProps={{
                name: 'departmentId',
                id: 'department-label'
              }}
            >
              <option aria-label='None' value='' />
              {departments.data && departments.data.departments.map((department, index) => <option value={department.id} key={index}>{department.name}</option>)}
            </Select>
            {errorValidation.departmentId && <FormHelperText>El departamento es obligatorio</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl margin='normal' fullWidth error={errorValidation.provinceId}>
            <InputLabel htmlFor='province-label'>
              Provincia
            </InputLabel>
            <Select
              native
              value={provinceId}
              onChange={handleProvince}
              onBlur={handleOnBlur}
              inputProps={{
                name: 'provinceId',
                id: 'province-label'
              }}
            >
              <option aria-label='None' value='' />
              {provinces.data && provinces.data.provinces.map((province, index) => <option value={province.id} key={index}>{province.name}</option>)}
            </Select>
            {errorValidation.provinceId && <FormHelperText>La provincia es obligatoria</FormHelperText>}
          </FormControl>
        </Grid>
      </Grid>
      <FormControl margin='normal' fullWidth error={errorValidation.districtId}>
        <InputLabel htmlFor='district-label'>
          Distrito
        </InputLabel>
        <Select
          native
          value={districtId}
          onChange={handleDistrict}
          onBlur={handleOnBlur}
          inputProps={{
            name: 'districtId',
            id: 'district-label'
          }}
        >
          <option aria-label='None' value='' />
          {districts.data && districts.data.districts.map((district, index) => <option value={district.id} key={index}>{district.name}</option>)}
        </Select>
        {errorValidation.districtId && <FormHelperText>El distrito es obligatorio</FormHelperText>}
      </FormControl>

      <TextField
        id='email' label='Correo electrónico'
        variant='outlined'
        margin='normal'
        type='email'
        name='email'
        error={errorValidation.email}
        helperText={errorValidation.email ? 'El email es obligatoria' : ' '}
        value={email}
        onChange={handleEmail}
        onBlur={handleOnBlur}
        required
        fullWidth
      />

      <TextField
        id='password' label='Contraseña'
        variant='outlined'
        margin='normal'
        type='password'
        name='password'
        error={errorValidation.password}
        helperText={errorValidation.password ? 'El password es obligatoria' : ' '}
        value={password}
        onChange={handlePassword}
        onBlur={handleOnBlur}
        required
        fullWidth
      />

      <Button
        type='submit'
        variant='contained'
        className={classes.submit}
      >
        Registrarse
      </Button>

      <AlertError />
    </form>
  )
}

RegisterUser.propTypes = {}

RegisterUser.defaultProps = {}

export default RegisterUser
