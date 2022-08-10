import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './Contents/Header';
import Customers from './Pages/Customers';
import Transactions from './Pages/Transactions';
import Transaction from './Pages/Transaction';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById("root"))
const UserExists = localStorage.getItem("session")
root.render(
    <BrowserRouter>
        {UserExists && <Header />}
        <Routes>
            <Route exact path="/" element={UserExists ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route exact path="/dashboard" element={UserExists ? <Dashboard /> : <Navigate to="/" replace />} />
            <Route exact path="/customers" element={UserExists ? <Customers /> : <Navigate to="/" replace />} />
            <Route exact path="/transactions" element={UserExists ? <Transactions /> : <Navigate to="/" replace />} />
            <Route exact path="/transaction" element={UserExists ? <Transaction /> : <Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);