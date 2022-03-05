import React, {useContext, useState} from 'react'
import './RegisterPage.css'
import handleFormSubmit from "./handleFormSubmit";
import {ErrorContext} from "../../common/errorContext";
import ToastComponent from "../../common/ToastError/ToastError";

const RegisterPage = ({setUser}) => {

    const [, setError] = useContext(ErrorContext);
    const [mode, setMode] = useState('signIn')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleInputChange = (inputType) => {
        return (event) => {
            if (inputType === 'name') setName(event.target.value)
            if (inputType === 'password') setPassword(event.target.value)
        }
    }

    return <div className="full-screen-container">
        <div className="login-container">
            <h3 className="login-title">Welcome</h3>
            <form>
                <div className="input-group">
                    <label htmlFor="name-input">User name </label>
                    <input onChange={handleInputChange('name')} value={name} maxLength='20' required id="name-input"
                           type="text"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password </label>
                    <input onChange={handleInputChange('password')} value={password} required id="password"
                           type="password"/>
                </div>
                <div className="button-group">
                    {(mode === 'signIn') &&
                    <span>Need an account? <a onClick={() => setMode('register')}>Create it now!</a></span>}
                    {(mode === 'register') &&
                    <span>Already registered? <a onClick={() => setMode('signIn')}>Sign In!</a></span>}
                    {(mode === 'register') &&
                    <button onClick={handleFormSubmit('', name, password, setUser, setError)} type="submit"
                            className="login-button">Register</button>}
                    {(mode === 'signIn') &&
                    <button onClick={handleFormSubmit('login', name, password, setUser, setError)} type="submit"
                            className="login-button">Sign
                        In</button>}
                </div>
            </form>
        </div>
        <ToastComponent/>
    </div>
}

export default RegisterPage