import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";


const ConfirmationPopup = ({callback, question, details}) => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleDelete = async () => await callback()
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') await callback()
  }

  return <div onKeyPress={handleKeyPress}>
    <button onClick={handleShow} className="btn btn-danger">
      Delete
    </button>


    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{question}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{details}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  </div>
}

export default ConfirmationPopup