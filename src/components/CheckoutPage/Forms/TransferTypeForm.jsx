import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function (props) {
    const [TransferType, setTransferType] = React.useState('');
    const [MessageType, setMessageType] = React.useState('');
    const currencies = [
        {
            value: 'To Bank',
            label: '🏦',
        },
        {
            value: 'To Person',
            label: '🧍',
        },
    ];
    const bankCodes = ["CHQB", "CORT", "HOLD", "INTC", "PHOB", "PHOI", "PHON", "REPA", "SDVA"];
    useEffect(() => { props.TransferTypeInfo(TransferType.length > 0 ? true : false, TransferType) }, [TransferType]);
    useEffect(() => { props.MessageTypeInfo(MessageType) }, [MessageType])
    return (
        <div style={{ margin: 'auto', width: '50%', display: 'flex' }}>
            <TextField
                id="outlined-select-TransferType"
                select
                label="Transfer Type"
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
                <InputLabel htmlFor="outlined-adornment-Date">Date</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Date"
                    type={'text'}
                    value={props.date.substring(0, props.date.length - 9)}
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
                label="Message Code"
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
