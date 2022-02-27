import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import handleEditTodo from "./handleEditTodo";


const EditTodoModal = ({show, setShow, todoEntry, todos, setTodos}) => {
    const todo_id = todoEntry.todo_id
    const description = todoEntry.description
    const [modalDescription, setModalDescription] = useState(description)
    const isDisabled = description === modalDescription || !modalDescription.length

    const handleClose = () => setShow(false)
    const handleEdit = async () => {
        await handleEditTodo(modalDescription, todos, setTodos, todo_id)
        handleClose()
    }
    const handleModalDescriptionChange = (event) => {
        setModalDescription(event.target.value)
    }

    useEffect(() => {
        if (show) setModalDescription(description)
    }, [show])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input maxLength='255' value={modalDescription} onChange={handleModalDescriptionChange} type='text'
                           className='form-control'/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={isDisabled} variant="warning" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditTodoModal