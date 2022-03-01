import React, {useState} from "react";
import handleFormSubmit from "./handleFormSubmit";

const InputTodo = ({todos, setTodos, pagination, setPagination, setCurrentPage}) => {

    const [description, setDescription] = useState('')

    const handleValidity = (event) => {
        const input = event.target
        if (input.validity.valueMissing) {
            input.setCustomValidity("This field can not be empty! Please fill it in")
        } else {
            input.setCustomValidity("")
        }
    }

    const handleChange = (event) => {
        setDescription(event.target.value)
        handleValidity(event)
    }

    return (
        <form onSubmit={(event) => handleFormSubmit(event, description, setDescription, todos, setTodos, pagination, setCurrentPage)}
              className='d-flex mt-5'>
            <input onInvalid={handleValidity} required maxLength='255' value={description} onChange={handleChange}
                   type='text' className='form-control'/>
            <button className='btn btn-success'>Add</button>
        </form>
    )
}
export default InputTodo