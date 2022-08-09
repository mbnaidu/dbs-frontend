import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
export default function (props) {
    const [TransferType, setTransferType] = React.useState('');
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
    useEffect(() => { props.TransferTypeInfo(TransferType.length > 0 ? true : false, TransferType) }, [TransferType])
    return (
        <div style={{ margin: 'auto', width: '30%', display: 'flex' }}>
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
        </div>
    )
}
