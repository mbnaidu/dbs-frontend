import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./App";
import Header from './Contents/Header';
import Customers from './Pages/Customers';
import Transactions from './Pages/Transactions';
import Transaction from './Pages/Transaction';
import Login from './Pages/Login';

const root = ReactDOM.createRoot(document.getElementById("root"))
const UserExists = localStorage.getItem("session")
root.render(
    <BrowserRouter>
        {UserExists && <Header />}
        <Routes>
            <Route exact path="/" element={UserExists ? <App /> : <Login />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/transactions" element={<Transactions />} />
            <Route exact path="/transaction" element={<Transaction />} />
        </Routes>
    </BrowserRouter>
);