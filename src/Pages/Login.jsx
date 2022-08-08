import React from 'react';
import "../Styles/Login.css"
import dbsLogo from '../Assets/dbs-bank-logo.png';

export default function Login() {
    const handleLogin = () => {
        localStorage.setItem("session", document.getElementById("username").value);
        window.location.reload();
    };
    const FormHeader = props => (
        <h2 id="headerTitle">
            <img src={dbsLogo} alt="logo" className="loginLogo" />
        </h2>
    );


    const Form = props => (
        <div>
            <FormInput description="Username" placeholder="Enter your username" type="text" id="username" />
            <FormInput description="Password" placeholder="Enter your password" type="password" id="password" />
            <FormButton title="Log in" />
        </div>
    );

    const FormButton = props => (
        <div id="button" className="row">
            <button onClick={() => handleLogin()}>{props.title}</button>
        </div>
    );

    const FormInput = props => (
        <div className="row">
            <label>{props.description}</label>
            <input type={props.type} placeholder={props.placeholder} id={props.id} />
        </div>
    );

    return (
        <div style={{ paddingTop: window.innerHeight - 800 }}>
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
            </div>
        </div>
    )
}
