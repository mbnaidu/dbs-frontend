import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import Header from './Contents/Header';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
const UserExists = localStorage.getItem("session");
root.render(
    <BrowserRouter>
        {UserExists && <Header />}
        <App />
    </BrowserRouter>
);