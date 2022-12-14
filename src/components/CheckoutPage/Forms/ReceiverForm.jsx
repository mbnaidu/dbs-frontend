import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { presentLanguage } from '../../../res/Values';

export default function ReceiverForm(props) {
    const [ReceiverAccNum, setReceiverAccNum] = useState("");
    const [ReceiverAccName, setReceiverAccName] = useState("");
    const [transferType, setTransferType] = useState(props.TransferTypeData || "");
    useEffect(() => {
        Axios.post(`http://localhost:8081/customer/get/${ReceiverAccNum}`)
            .then((response) => {
                if (response.data) {
                    if ((response.data.accName).indexOf("BANK") > 0 && transferType === "To Bank") {
                        setReceiverAccName(response.data.accName)
                    }
                    if ((response.data.accName).indexOf("BANK") === -1 && transferType === "To Person") {
                        setReceiverAccName(response.data.accName)
                    }
                }
            })
            .catch((error) => console.log(error))
    }, [ReceiverAccNum]);

    useEffect(() => {
        props.receiverInfo(ReceiverAccName.length > 0 && props.SenderAccNo !== ReceiverAccNum ? true : false, ReceiverAccNum)
    }, [ReceiverAccName, props, ReceiverAccNum]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                {presentLanguage.word_Receiver_Information}
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
