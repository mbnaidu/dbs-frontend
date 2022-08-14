import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { presentLanguage } from '../../../res/Values';

var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function (props) {
    const [TransferType, setTransferType] = React.useState('');
    const [MessageType, setMessageType] = React.useState('');
    const currencies = [
        {
            value: presentLanguage.word_To_Bank,
            label: '🏦',
        },
        {
            value: presentLanguage.word_To_Person,
            label: '🧍',
        },
    ];
    const bankCodes = ["CHQB", "CORT", "HOLD", "INTC", "PHOB", "PHOI", "PHON", "REPA", "SDVA"];
    useEffect(() => {
        props.TransferTypeInfo(TransferType.length > 0 ? true : false, TransferType);
    }, [TransferType, props]);
    useEffect(() => {
        props.MessageTypeInfo(MessageType);
    }, [props, MessageType])
    return (
        <div style={{ margin: 'auto', width: '50%', display: 'flex' }}>
            <TextField
                id="outlined-select-TransferType"
                select
                label={presentLanguage.word_Transfer_Type}
                value={TransferType}
                onChange={(e) => setTransferType(e.target.value)}
                sx={{ width: '25ch' }}
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}{` `} {option.value}
                    </MenuItem>
                ))}
            </TextField>
            {' '}
            <FormControl sx={{ m: 1, width: '25ch', mt: 0 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Date">{presentLanguage.word_Date}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Date"
                    type={'text'}
                    value={date}
                    disabled
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                            >
                                <CalendarMonthIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Date"
                />
            </FormControl>
            {' '}
            <TextField
                id="outlined-select-MessageType"
                select
                label={presentLanguage.word_Message_Code}
                value={MessageType}
                onChange={(e) => setMessageType(e.target.value)}
                sx={{ width: '25ch' }}
            >
                {bankCodes.map((code) => (
                    <MenuItem key={code} value={code}>
                        {code}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}
