import { Button } from '@mui/material';
import '../App.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { postLogin } from '../services/userServices';

function LoginPage() {
    const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleLogin = () => {
    if(username && password) {
    postLogin(username, password).then((res) => {
      console.log("REQUEST DONE");
    }).catch((error) => {
      // Handle error here
      console.log('An error occurred during login:', error);
      setUsernameError(true)
      setPasswordError(true)
    });
    return
  }
  if(!username) {
    setUsernameError(true)
  }
  if(!password) {
    setPasswordError(true)
  }
  console.log('O bob vej nai t dhen personale')
  }
  return (
    <div className="container">
      <h1>Login</h1>
      <TextField required error={usernameError} onChange={u => {setUsername(u.target.value); setUsernameError(false)}} className="item" id="outlined-basic" label="Username" variant="standard" />
      <TextField required error={passwordError} onChange={p => {setPassword(p.target.value); setPasswordError(false)}} className="item" id="outlined-basic" label="Password" variant="standard" type='password' />
      <Button className="item" id='submit-button' variant="contained" onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default LoginPage;