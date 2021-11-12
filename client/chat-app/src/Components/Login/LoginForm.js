import React from 'react'
import TextField from '@mui/material/TextField';

function LoginForm() {
    return (
        <form>
            <div>
                <h2>Login</h2>
                <ul>
                    <li className='p-1'>
                        <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        /> 
                    </li>
                    <li className='p-1'>
                        <TextField
                        required
                        id="outlined-required"
                        type="password"
                        label="Password"
                        />  
                    </li>
                
                </ul>
                
            </div>
        </form>
    )
}

export default LoginForm
