import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from "./App";
import Login from './components/Pages/Login';

const root = ReactDOM.createRoot(document.getElementById("root"))
const UserExists = localStorage.getItem("session")
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={UserExists ? <App /> : <Login />} />
        </Routes>
    </BrowserRouter>
);