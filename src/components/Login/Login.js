import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { useNavigation, Link } from 'react-navi';
import styles from './Login.module.css';
import { StateContext } from '../../contexts';


const Login = () => {
  const { dispatch } = useContext(StateContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginFailed, setLoginFailed ] = useState(false);

  const [ user, login ] = useResource((username, password) => ({
    url: `user/login`,
    method: 'post',
    data: { username, password }
  }));

  const navigation = useNavigation();

  useEffect(() => {
    if (user && user.data) {
        setLoginFailed(false)
        dispatch({ type: 'LOGIN', name: user.data.full_name })
        navigation.navigate('/dashboard') 
    }
    if (user && user.error) {
      console.log(user.error.data.message);
      setLoginFailed(true)
    }
  }, [user])

  function handleUsername (e) {
    setUsername(e.target.value)
  }

  function handlePassword (e) {
    setPassword(e.target.value)
  }
  
  return (
    <div className={styles.Login} data-testid="Login">
    <form onSubmit={e => { e.preventDefault(); login(username, password) }}>
      <label htmlFor="username">Username:</label>
      <input type="email" value={username} onChange={handleUsername} name="username" id="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" value={password} onChange={handlePassword} name="password" id="password" />
      <button type="submit" disabled={username.length === 0 || password.length === 0}>Login</button>
      {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </form>
    <a href="#">Olvido su contraseña?</a>
    <br />
    <Link href={'/register'}>Registrarse</Link>
  </div>
  )
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
