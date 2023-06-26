import {Box, Button, IconButton, InputAdornment} from '@mui/material';
import './login.css';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { postLogin } from '../../services/userServices';
import { toast } from "react-toastify";
import {useAppContext} from "../../AppContext";

function LoginPage(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    user: [user, setUser],
  } = useAppContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault()
    if(username && password) {
      postLogin(username, password).then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          localStorage.setItem("cc-user", JSON.stringify(res.data));
          localStorage.setItem("cc-token", res.headers["authorization"]);
          res.headers["Authorization"] = res.data.token;
        }
        toast('Logged in')
      }).catch((error) => {
        // Handle error here
        console.log('An error occurred during login:', error);
        toast.warning('An error occurred during login: '+ error);
        setUsernameError(true)
        setPasswordError(true)
      });
      // return
    }
    if(!username && !password) {
      toast.warning('Username and Password are required')
      setUsernameError(true)
      setPasswordError(true)
    }
    else if(!username) {
      toast.warning('Username is required')
      setUsernameError(true)
    }
    else if(!password) {
      toast.warning('Password is required')
      setPasswordError(true)
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin} className={usernameError || passwordError ? "container containerError" : "container"}>
      <h1>Login</h1>
      <TextField required error={usernameError} onChange={u => {setUsername(u.target.value); setUsernameError(false)}} className="item" id="username-field" label="Username" variant="standard" />
      {/*<TextField required error={usernameError} onChange={u => {setUsername(u.target.value); setUsernameError(false)}} className="item" id="username-field" label="Username" variant="standard" />*/}
      <TextField
          required
          error={passwordError}
          onChange={p => {setPassword(p.target.value); setPasswordError(false)}}
          className="item"
          id="password-field"
          label="Password"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (<InputAdornment position="end">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>)
          }}
      />
      <Button type="submit" className="item" color={usernameError || passwordError ? "error" : "primary"} id='submit-button' variant={usernameError || passwordError ? "outlined" : "contained"} >Login</Button>
    </Box>
  );
}

export default LoginPage;