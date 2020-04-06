import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { useNavigation } from 'react-navi';
import styles from './RegisterUser.module.css';
import { StateContext } from '../../contexts';
import { api } from '../../middleware/api';

const RegisterUser = () => {
  const { dispatch } = useContext(StateContext);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ institution, setInstitution ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordRepeat, setPasswordRepeat ] = useState('');
  const [ registerFailed, setRegisterFailed ] = useState(false);
  const [ departmentId, setDepartmentId] = useState(0);
  const [ provinceId, setProvinceId] = useState(0);
  const [ districtId, setDistrictId] = useState(0);

  const [ user, registerUser ] = useResource(api.registerUser);
  const [ departments, getDepartments ] = useResource(api.getDepartments);
  const [ provinces, getProvinces ] = useResource(api.getProvinces);
  const [ districts, getDistricts ] = useResource(api.getDistricts);

  const navigation = useNavigation();

  useEffect(() => getDepartments(), [])

  useEffect(() => getProvinces(departmentId), [departmentId])

  useEffect(() => getDistricts(provinceId), [provinceId])

  useEffect(() => {
    if (user && user.data) {
        setRegisterFailed(false)
        dispatch({ type: 'REGISTER', email: user.data.email })
        navigation.navigate('/') 
    }
    if (user && user.error) {
      console.log(user.error.data.message);
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

  function handleDistrict(e) {
    setDistrictId(e.target.value)
  }

  function handleDepartment(e) {
    setDepartmentId(e.target.value);
  }

  function handleProvince(e) {
    setProvinceId(e.target.value);
  }

  return (
    <div className={styles.RegisterUser} data-testid="RegisterUser">
      <form onSubmit={e => { e.preventDefault(); registerUser(firstName, lastName, institution, email, password, departmentId, provinceId, districtId)}}>
        <label htmlFor="first_name">Nombres:</label>
        <input type="text" value={firstName} onChange={handleFirstName} name="first_name" id="first_name" required />
        <br />
        <label htmlFor="last_name">Apellidos:</label>
        <input type="text" value={lastName} onChange={handleLastName} name="last_name" id="last_name" required />
        <br />
        <label htmlFor="institution">Institución:</label>
        <input type="text" value={institution} onChange={handleInstitution} name="institution" id="institution" required />
        <br />
        <label htmlFor="department">Departamento:</label>
        <select onChange={handleDepartment}>
          <option>Seleccione</option>
          {departments.data && departments.data.departments.map((department, index)=> <option value={department.id} key={index}>{department.name}</option>) }
        </select>
        <br />
        <label htmlFor="province">Provincia:</label>
        <select onChange={handleProvince}>
          <option>Seleccione</option>
          {provinces.data && provinces.data.provinces.map((province, index)=> <option value={province.id} key={index}>{province.name}</option>) }
        </select>
        <br />
        <label htmlFor="district">Districto:</label>
        <select onChange={handleDistrict}>
          <option>Seleccione</option>
          {districts.data && districts.data.districts.map((district, index)=> <option value={district.id} key={index}>{district.name}</option>) }
        </select>
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={handleEmail} name="email" id="email" required />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input type="password" value={password} onChange={handlePassword} name="password" id="password" required/>
        <br />
        <label htmlFor="password-repeat">Repetir contraseña:</label>
        <input type="password" value={passwordRepeat} onChange={handlePasswordRepeat} name="password-repeat" id="password-repeat" required />
        <br />
        <button type="submit" disabled={password != passwordRepeat}>Registrar</button>
      </form>
    </div>
  )
}

RegisterUser.propTypes = {};

RegisterUser.defaultProps = {};

export default RegisterUser;
