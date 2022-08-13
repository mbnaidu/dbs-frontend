import React from 'react';
import "../Styles/Login.css"
import dbsLogo from '../Assets/dbs-bank-logo.png';
import Axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const handleLogin = () => {
        if (document.getElementById("username").value.length > 0) {
            const data = {
                empName: document.getElementById("username").value,
                empPswd: document.getElementById("password").value
            }
            Axios.post("http://localhost:8081/employee/add", data)
                .then((response) => {
                    if (response.data === "Saved") {
                        localStorage.setItem("session", document.getElementById("username").value);
                        window.location.reload();
                    } else {
                        setOpen(true);
                    }
                })
                .catch((error) => { console.log(error) });
        }
    };
    const FormHeader = () => (
        <h2 id="headerTitle">
            <img src={dbsLogo} alt="logo" className="loginLogo" />
        </h2>
    );


    const Form = () => (
        <div>
            <FormInput description="Username" placeholder="Enter your username" type="text" id="username" />
            <FormInput description="Password" placeholder="Enter your password" type="password" id="password" />
            <FormButton title="Login" />
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Logged out from previous session❓"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <strong>LOGOUT</strong> to continue ...❗
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
            </div>
        </div>
    )
}
