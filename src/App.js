import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Customers from './Pages/Customers';
import Transactions from './Pages/Transactions';
import Transaction from './Pages/Transaction';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { bgColor } from './Globals/GlobalValues';

export default function App() {
    const UserExists = localStorage.getItem("session");
    useEffect(() => { document.body.style.background = bgColor }, [])
    return (
        <div >
            <Routes>
                <Route exact path="/" element={UserExists ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route exact path="/dashboard" element={UserExists ? <Dashboard /> : <Navigate to="/" replace />} />
                <Route exact path="/customers" element={UserExists ? <Customers /> : <Navigate to="/" replace />} />
                <Route exact path="/transactions" element={UserExists ? <Transactions /> : <Navigate to="/" replace />} />
                <Route exact path="/transaction" element={UserExists ? <Transaction /> : <Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}
