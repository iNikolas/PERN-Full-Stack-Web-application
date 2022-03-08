import React, { useContext, useRef, useState } from "react";
import handleFormSubmit from "./handleFormSubmit";
import { UserContext } from "../../common/userContext";

const InputTodo = ({ todos, setTodos, pagination, setCurrentPage }) => {
  const [user] = useContext(UserContext);
  const inputRef = useRef(null);
  const [description, setDescription] = useState("");

  const handleValidity = (event) => {
    const input = event.target;
    if (input.validity.valueMissing) {
      input.setCustomValidity("This field can not be empty! Please fill it in");
    } else {
      input.setCustomValidity("");
    }
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
    handleValidity(event);
  };
  const handleCreateTodo = async (event) => {
    event.preventDefault();
    await handleFormSubmit(
      event,
      description,
      setDescription,
      todos,
      setTodos,
      pagination,
      setCurrentPage,
      user
    );
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleCreateTodo} className="d-flex mt-5">
      <input
        ref={inputRef}
        onInvalid={handleValidity}
        required
        maxLength="255"
        value={description}
        onChange={handleChange}
        type="text"
        className="form-control"
      />
      <button className="btn btn-success">Add</button>
    </form>
  );
};
export default InputTodo;
