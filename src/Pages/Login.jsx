import React, { useState } from 'react';
import "../Styles/Login.css"
import dbsLogo from '../Assets/dbs-bank-logo.png';
import Axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { presentLanguage } from '../res/Values';
import { useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
    const [open, setOpen] = React.useState(false);
    const [employeeID, setEmployeeID] = React.useState("");
    const [employeePassword, setEmployeePassword] = useState("");
    useEffect(() => {
        employeeID.length === 6 && employeePassword.length === 6 && handleLogin();// eslint-disable-next-line
    }, [employeeID, employeePassword]);

    const handleLogin = () => {
        const data = {
            empName: employeeID,
            empPswd: employeePassword,
        }
        Axios.post("http://localhost:8081/employee/add", data)
            .then((response) => {
                if (response.data === "Saved") {
                    localStorage.setItem("session", employeeID);
                    window.location.reload();
                } else {
                    setOpen(true);
                }
            })
            .catch((error) => { console.log(error) });
    };
    const FormHeader = () => (
        <h2 id="headerTitle">
            <img src={dbsLogo} alt="logo" className="loginLogo" />
        </h2>
    );

    return (
        <div style={{ paddingTop: window.innerHeight - 750 }} className="loginSection">
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
                <section>
                    <form action="">
                        <div className="input-container" style={{ marginBottom: 40 }}>
                            <input id="name" className="input" type="number" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} />
                            <label className="label" htmlFor="name">Employee ID</label>
                        </div>
                        <div className="input-container" style={{ marginBottom: 40 }}>
                            <input id="name" className="input" type="password" value={employeePassword} onChange={(e) => setEmployeePassword(e.target.value)} />
                            <label className="label" htmlFor="name">Employee Pasword</label>
                        </div>
                    </form>
                </section>

            </div>
        </div>
    )
}
