import React, {createContext, useState} from "react"

export const ErrorContext = createContext([{}, (err) => err])


const ErrorProvider = (props) => {
    const [error, setError] = useState(null)
    return (
        <ErrorContext.Provider value={[error, setError]}>
            {props.children}
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;