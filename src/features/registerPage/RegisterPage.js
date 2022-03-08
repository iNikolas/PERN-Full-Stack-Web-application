import React, { useContext, useState } from "react";
import "./RegisterPage.css";
import handleFormSubmit from "./handleFormSubmit";
import { ErrorContext } from "../../common/errorContext";
import ToastComponent from "../../common/ToastError/ToastError";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const RegisterPage = ({ setUser }) => {
  const [, setError] = useContext(ErrorContext);
  const [working, setWorking] = useState(false);
  const [mode, setMode] = useState("signIn");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [errorClassName, setErrorClassName] = useState("");

  const handleInputChange = (inputType) => {
    return (event) => {
      if (inputType === "name") setName(event.target.value);
      if (inputType === "password") {
        setPassword(event.target.value);
        if (showOverlay) {
          setShowOverlay(false);
          setErrorClassName("");
        }
      }
      if (inputType === "password-confirm") {
        setPasswordConfirm(event.target.value);
        if (showOverlay) {
          setShowOverlay(false);
          setErrorClassName("");
        }
      }
    };
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h3 className="login-title">Welcome</h3>
        <form>
          <div className="input-group">
            <label htmlFor="name-input">User name </label>
            <input
              onChange={handleInputChange("name")}
              value={name}
              maxLength="20"
              required
              id="name-input"
              type="text"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password </label>
            <OverlayTrigger
              placement="auto"
              show={showOverlay}
              overlay={(props) => (
                <Tooltip
                  className="passwords-tooltip"
                  id="button-tooltip"
                  {...props}
                >
                  Passwords do not match
                </Tooltip>
              )}
            >
              <input
                className={errorClassName}
                onChange={handleInputChange("password")}
                value={password}
                required
                id="password"
                type="password"
              />
            </OverlayTrigger>
          </div>
          {mode === "register" && (
            <div className="input-group">
              <label htmlFor="password-confirm">Confirm password </label>
              <input
                className={errorClassName}
                onChange={handleInputChange("password-confirm")}
                value={passwordConfirm}
                required
                id="password-confirm"
                type="password"
              />
            </div>
          )}
          <div className="button-group">
            {mode === "signIn" && (
              <span>
                Need an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setMode("register")}
                >
                  Create it now!
                </button>
              </span>
            )}
            {mode === "register" && (
              <span>
                Already registered?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setMode("signIn")}
                >
                  Sign In!
                </button>
              </span>
            )}
            {mode === "register" && (
              <button
                type="submit"
                disabled={working}
                onClick={handleFormSubmit(
                  "",
                  name,
                  password,
                  passwordConfirm,
                  setUser,
                  setError,
                  setWorking,
                  setShowOverlay,
                  setErrorClassName
                )}
                className="login-button"
              >
                Register
              </button>
            )}
            {mode === "signIn" && (
              <button
                type="submit"
                disabled={working}
                onClick={handleFormSubmit(
                  "login",
                  name,
                  password,
                  passwordConfirm,
                  setUser,
                  setError,
                  setWorking,
                  setShowOverlay,
                  setErrorClassName
                )}
                className="login-button"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastComponent />
    </div>
  );
};

export default RegisterPage;
