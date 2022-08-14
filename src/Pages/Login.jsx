import React from 'react';
import "../Styles/Login.css"
import dbsLogo from '../Assets/dbs-bank-logo.png';
import Axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { presentLanguage } from '../res/Values';


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
            <FormInput description={presentLanguage.word_Username} placeholder={presentLanguage.word_Enter_your_username} type="text" id="username" />
            <FormInput description={presentLanguage.word_Password} placeholder={presentLanguage.word_Enter_your_password} type="password" id="password" />
            <FormButton title={presentLanguage.word_Login} />
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
                <DialogTitle>{presentLanguage.word_Logged_out_from_previous_session}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <strong>{presentLanguage.word_LOGOUT}</strong>{presentLanguage.word_to_continue}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>{presentLanguage.word_Ok}</Button>
                </DialogActions>
            </Dialog>
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
            </div>
        </div>
    )
}
