import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


function Login(){
    const [username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();



    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');
        setLoginError('');
        if (!username) {
            setUsernameError("Username is required");
        } else {
          setUsernameError("");
        }
        if (!password) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }

        if (!username || !password) return; 
        console.log({
            username: username.trim(),
            password
        });

        try {
            const response = await api.post('/login', {username, password,});

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.data?.message) {
                setLoginError(error.response.data.message);
            } else {
                setLoginError('Invalid username or password');
            }

        }


    };

    return(
        <Box sx={{minHeight: '100vh', width:'100%', display: 'flex', justifyContent: 'center',   
            alignItems: 'center', padding: 2}}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>


                <TextField label="Username" variant="outlined" fullWidth margin="normal"
                    value={username} onChange={(e) =>{setUsername(e.target.value);setPasswordError('');
                        setLoginError('');}}
                    error={!!usernameError}helperText={usernameError}/>
                <TextField label="Password" type="password" variant="outlined" fullWidth
                    margin="normal" value={password} onChange={(e) =>{ setPassword(e.target.value);setPasswordError('');
                        setLoginError('');}}
                    error={!!passwordError}helperText={passwordError}/>
                <Button variant="contained" type="button"color="primary" fullWidth sx={{ mt: 2 ,backgroundColor: 'black'  }} onClick={handleLogin} >
                    Login</Button>
                {loginError && (<p style={{ color: 'red', marginTop: '5px' }}>{loginError}</p>)}


            </Box>

        </Box>
    )

}
export default Login;
