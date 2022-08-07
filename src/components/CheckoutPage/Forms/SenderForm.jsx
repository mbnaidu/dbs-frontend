import { Button, Grid, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function SenderForm(props) {
    const [SenderAccNum, setSenderAccNum] = useState("");
    const [SenderAccName, setSenderAccName] = useState("");
    useEffect(() => {
        const senderData = {
            "accNo": SenderAccNum
        }
        Axios.post('http://localhost:8081/customer/get', senderData)
            .then((response) => {
                setSenderAccName(response.data ? response.data.accName : "");
            })
            .catch((error) => console.log(error))
    }, [SenderAccNum]);
    useEffect(() => {
        props.senderInfo(SenderAccName.length > 0 ? true : false, SenderAccNum)
    }, [SenderAccName]);
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Sender Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Sender Acc Num" variant="standard" value={SenderAccNum} onChange={(event) => setSenderAccNum(event.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Sender Name" variant="standard" value={SenderAccName} disabled />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
