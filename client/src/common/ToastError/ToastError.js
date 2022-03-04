import React, {useContext} from "react"
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"
import img from "./icon-alert.png";
import {ErrorContext} from "../errorContext";

const ToastComponent = () => {

    const [error,setError] = useContext(ErrorContext);

    if (!error) return null

    const {title, detail, status} = error

    return (
        <ToastContainer className="p-3" position="bottom-center">
            <Toast show={true} onClose={() => setError(null)} animation>
                <Toast.Header>
                    <img src={img} className="rounded me-2" alt="" />
                    <strong className="me-auto">{title}</strong>
                    <small>Error code {status}</small>
                </Toast.Header>
                <Toast.Body>{detail}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent