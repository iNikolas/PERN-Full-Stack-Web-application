import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorProvider from "./common/errorContext";

ReactDOM.render(
    <React.StrictMode>
        <ErrorProvider>
            <App/>
        </ErrorProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
