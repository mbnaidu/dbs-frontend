import { MenuItem, TextField } from '@mui/material'
import React, { useEffect } from 'react'

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
        <div>
            <TextField
                id="outlined-select-TransferType"
                select
                label="Transfer Type"
                value={TransferType}
                onChange={(e) => setTransferType(e.target.value)}
                helperText="Please select Transaction Type"
            >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}{` `} {option.value}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}
