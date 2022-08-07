import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {
    useNavigate,
} from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const handleLogin = () => {
        localStorage.setItem("session", UserName);
        window.location.reload();
    }
    return (
        <div>
            <TextField id="standard-basic" label="Username" variant="standard" value={UserName} onChange={(e) => setUserName(e.target.value)} required /><br />
            <TextField id="standard-basic" label="Password" variant="standard" value={Password} onChange={(e) => setPassword(e.target.value)} required /><br />
            <Button onClick={() => handleLogin()}>Login</Button>
        </div>
    )
}
