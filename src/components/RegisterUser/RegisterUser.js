import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useNavigation } from 'react-navi'
import styles from './RegisterUser.module.css'
import { StateContext } from '../../contexts'

const RegisterUser = () => {
  const { dispatch } = useContext(StateContext)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ institution, setInstitution ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordRepeat, setPasswordRepeat ] = useState('')
  const [ registerFailed, setRegisterFailed ] = useState(false)

  const [ user, registerUser ] = useResource((firstName, lastName, institution, email, password) => ({
    url: 'users',
    method: 'post',
    data: { firstName, lastName, institution, email, password }
  }))

  const navigation = useNavigation()

  useEffect(() => {
    if (user && user.data) {
      setRegisterFailed(false)
      dispatch({ type: 'REGISTER', email: user.data.email })
      navigation.navigate('/') 
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

  return (
    <div className={styles.RegisterUser} data-testid="RegisterUser">
      <form onSubmit={e => { e.preventDefault(); registerUser(firstName, lastName, institution, email, password)}}>
        <label htmlFor="first_name">Nombres:</label>
        <input type="text" value={firstName} onChange={handleFirstName} name="first_name" id="first_name" required />
        <label htmlFor="last_name">Apellidos:</label>
        <input type="text" value={lastName} onChange={handleLastName} name="last_name" id="last_name" required />
        <label htmlFor="institution">Institución:</label>
        <input type="text" value={institution} onChange={handleInstitution} name="institution" id="institution" required />
        <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={handleEmail} name="email" id="email" required />
        <label htmlFor="password">Contraseña:</label>
        <input type="password" value={password} onChange={handlePassword} name="password" id="password" required/>
        <label htmlFor="password-repeat">Repetir contraseña:</label>
        <input type="password" value={passwordRepeat} onChange={handlePasswordRepeat} name="password-repeat" id="password-repeat" required />
        <button type="submit" disabled={password != passwordRepeat}>Registrar</button>
      </form>
    </div>
  )
}

RegisterUser.propTypes = {}

RegisterUser.defaultProps = {}

export default RegisterUser
