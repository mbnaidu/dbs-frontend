import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {
    useNavigate,
} from "react-router-dom";
import "../../Styles/Login.css"

export default function Login() {
    let navigate = useNavigate();
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const handleLogin = () => {
        localStorage.setItem("session", UserName);
        window.location.reload();
    };
    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );


    const Form = props => (
        <div>
            <FormInput description="Username" placeholder="Enter your username" type="text" />
            <FormInput description="Password" placeholder="Enter your password" type="password" />
            <FormButton title="Log in" />
        </div>
    );

    const FormButton = props => (
        <div id="button" class="row">
            <button>{props.title}</button>
        </div>
    );

    const FormInput = props => (
        <div class="row">
            <label>{props.description}</label>
            <input type={props.type} placeholder={props.placeholder} />
        </div>
    );

    const OtherMethods = props => (
        <div id="alternativeLogin">
            <label>Or sign in with:</label>
            <div id="iconGroup">
                <Facebook />
                <Twitter />
                <Google />
            </div>
        </div>
    );

    const Facebook = props => (
        <a href="#" id="facebookIcon"></a>
    );

    const Twitter = props => (
        <a href="#" id="twitterIcon"></a>
    );

    const Google = props => (
        <a href="#" id="googleIcon"></a>
    );

    return (
        <div>
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
                <OtherMethods />
            </div>
            {/* <TextField id="standard-basic" label="Username" variant="standard" value={UserName} onChange={(e) => setUserName(e.target.value)} required /><br />
            <TextField id="standard-basic" label="Password" variant="standard" value={Password} onChange={(e) => setPassword(e.target.value)} required /><br />
            <Button onClick={() => handleLogin()}>Login</Button> */}
        </div>
    )
}
