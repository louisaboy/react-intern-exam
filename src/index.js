import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CreateInvoice from "./CreateInvoice";
import Invoices from "./invoices-list";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Invoices />} />
                <Route path="/create" element={<CreateInvoice/>} />
                <Route path="/create/invoices" element={<Invoices />}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

