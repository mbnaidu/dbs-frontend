import React from 'react';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import MaterialLayout from '../components/Layout/MaterialLayout';

export default function Transaction() {
    return (
        <div>
            <MaterialLayout>
                <CheckoutPage />
            </MaterialLayout>
        </div>
    )
}
