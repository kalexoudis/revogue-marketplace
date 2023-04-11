import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-image-gallery/styles/css/image-gallery.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "./utils/stripe";
import {SnackBarProvider} from "./contexts/SnackbarContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SnackBarProvider>
            <BrowserRouter>
                <Elements stripe={stripePromise}>
                    <App/>
                </Elements>
            </BrowserRouter>
        </SnackBarProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
