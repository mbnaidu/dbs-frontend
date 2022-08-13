import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';

export default function ReceiverForm(props) {
    const [ReceiverAccNum, setReceiverAccNum] = useState("");
    const [ReceiverAccName, setReceiverAccName] = useState("");

    useEffect(() => {
        Axios.post(`http://localhost:8081/customer/get/${ReceiverAccNum}`)
            .then((response) => {
                setReceiverAccName(response.data ? response.data.accName : "");
            })
            .catch((error) => console.log(error))
    }, [ReceiverAccNum]);

    useEffect(() => {
        props.receiverInfo(ReceiverAccName.length > 0 && props.SenderAccNo !== ReceiverAccNum ? true : false, ReceiverAccNum)
    }, [ReceiverAccName, props, ReceiverAccNum]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Receiver Information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Receiver Acc Num" variant="standard" value={ReceiverAccNum} onChange={(event) => setReceiverAccNum(event.target.value)} /><br />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Receiver Name" variant="standard" value={ReceiverAccName} disabled />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
