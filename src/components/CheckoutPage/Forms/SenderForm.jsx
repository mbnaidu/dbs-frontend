import { Grid, TextField, Typography } from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { presentLanguage } from '../../../res/Values';


export default function SenderForm(props) {
    const [SenderAccNum, setSenderAccNum] = useState("");
    const [SenderAccName, setSenderAccName] = useState("");
    useEffect(() => {
        Axios.post(`http://localhost:8081/customer/get/${SenderAccNum}`)
            .then((response) => {
                setSenderAccName(response.data ? response.data.accName : "");
            })
            .catch((error) => console.log(error))
    }, [SenderAccNum]);
    useEffect(() => {
        props.senderInfo(SenderAccName.length > 0 ? true : false, SenderAccNum)
    }, [SenderAccName, props, SenderAccNum]);
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {presentLanguage.word_Sender_Information}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField label={presentLanguage.word_Sender_Acc_Num} variant="standard" value={SenderAccNum} onChange={(event) => setSenderAccNum(event.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label={presentLanguage.word_Sender_Name} variant="standard" value={SenderAccName} disabled />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
