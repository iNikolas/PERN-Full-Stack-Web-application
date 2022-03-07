import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorProvider from "./common/errorContext";
import UserProvider from "./common/userContext";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <ErrorProvider>
                <App/>
            </ErrorProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
