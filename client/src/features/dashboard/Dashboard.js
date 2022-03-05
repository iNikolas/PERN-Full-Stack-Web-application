import React, {useContext, useEffect, useState} from "react"
import Modal from 'react-bootstrap/Modal'
import {UserContext} from "../../common/userContext"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

const Dashboard = ({showDashboard, setShowDashboard}) => {

    const [user] = useContext(UserContext)
    const {name, rights} = user.data.attributes
    const id = user.data.id

    const [newName, setNewName] = useState(name)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [changePassword, setChangePassword] = useState(false)

    const isDisabled = !oldPassword || (changePassword && (!newPassword || !passwordConfirmation)) || ((newName === name || !newName) && !changePassword)

    const handleFieldChange = (fieldName) => {
        return (event) => {
            const value = event.target.value

            if (fieldName === 'newName') setNewName(value)
            if (fieldName === 'oldPassword') setOldPassword(value)
            if (fieldName === 'newPassword') setNewPassword(value)
            if (fieldName === 'passwordConfirmation') setPasswordConfirmation(value)
        }
    }

    const handleFormSubmit = () => {

        console.log({newName, oldPassword, newPassword, passwordConfirmation})
    }

    useEffect(() => {
        if (showDashboard) {
            setNewName(name)
            setOldPassword('')
            setNewPassword('')
            setPasswordConfirmation('')
            setChangePassword(false)
        }
    }, [showDashboard])

    return <Modal
        show={showDashboard}
        onHide={() => setShowDashboard(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
    >
        <Modal.Header closeButton>
            <Modal.Title>Dashboard panel: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><b>Your unique user ID is</b>: {id}</p>
            <p><b>Rights</b>: {rights}</p>
            <Form onSubmit={(event) => event.preventDefault()}>
                <Form.Group className="mb-3" controlId="formNewName">
                    <Form.Label>New user name</Form.Label>
                    <Form.Control type="text" value={newName} onChange={handleFieldChange('newName')} maxLength='20'
                                  placeholder="Your new name"/>
                    <Form.Text className="text-muted">
                        You can leave this field empty to persist current name
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formOldPassword">
                    <Form.Label>Current password</Form.Label>
                    <Form.Control value={oldPassword} onChange={handleFieldChange('oldPassword')} required
                                  type="password" placeholder="Password"/>
                    <Form.Text className="text-muted">
                        Can not be empty
                    </Form.Text>
                </Form.Group>

                {changePassword && <><Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Label>New password</Form.Label>
                    <Form.Control value={newPassword} onChange={handleFieldChange('newPassword')} required
                                  type="password" placeholder="Password"/>
                    <Form.Text className="text-muted">
                        You can leave this field empty to persist current password
                    </Form.Text>
                </Form.Group>

                    <Form.Group className="mb-3" controlId="formPasswordConfirm">
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control value={passwordConfirmation} onChange={handleFieldChange('passwordConfirmation')}
                                      required type="password" placeholder="Password"/>
                    </Form.Group></>}

                <Form.Group className="mb-3" controlId="changePasswordCheckbox">
                    <Form.Check checked={changePassword} onChange={() => setChangePassword(prevState => !prevState)}
                                type="checkbox" label="Change password"/>
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDashboard(false)}>
                Close
            </Button>
            <Button disabled={isDisabled} onClick={handleFormSubmit} variant="primary">Save changes</Button>
        </Modal.Footer>
    </Modal>
}

export default Dashboard