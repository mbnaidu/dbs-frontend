import { Button } from '@mui/material';
import React from 'react'
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import MaterialLayout from '../components/Layout/MaterialLayout';

export default function Transaction() {
    return (
        <div>
            <MaterialLayout>
                <CheckoutPage />
                <Button variant="contained" color="error" onClick={() => { localStorage.clear(); window.location.reload() }}>LOGOUT</Button>
            </MaterialLayout>
        </div>
    )
}
