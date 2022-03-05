import React, {useContext} from "react"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import logoImg from './logo.webp'
import logoutImg from './logout.svg'
import {UserContext} from "../../common/userContext";
import './Header.css'
import {ErrorContext} from "../../common/errorContext";
import handleLogoutUser from "./handleLogoutUser";

const Header = ({setShowDashboard}) => {

    const [user, setUser] = useContext(UserContext)
    const [, setError] = useContext(ErrorContext)
    const {name} = user.data.attributes

    return <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand> <img
                src={logoImg}
                width="45"
                height="45"
                className="d-inline-block align-top"
                alt="PERN Todo logo"
            /></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a className='user-name' onClick={() => setShowDashboard(true)}>{name}</a>
                </Navbar.Text>
                <img
                    src={logoutImg}
                    width="15"
                    height="15"
                    className="d-inline-block align-top m-1 logout-img"
                    alt="Logout image"
                    onClick={async () => await handleLogoutUser(setError, setUser)}
                />
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header