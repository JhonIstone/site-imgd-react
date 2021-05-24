import React from 'react';
import { BrowserRouter } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

import Routes from './routes/'
import AuthProvider from './context/auth'
function App(){
    return(
        <AuthProvider>
            <ToastContainer/>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;