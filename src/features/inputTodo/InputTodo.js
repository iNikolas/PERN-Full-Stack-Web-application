import React, { useContext, useRef, useState } from "react";
import handleFormSubmit from "./handleFormSubmit";
import { UserContext } from "../../common/userContext";

const InputTodo = ({ todos, setTodos, pagination, setCurrentPage }) => {
  const [user] = useContext(UserContext);
  const inputRef = useRef(null);
  const [description, setDescription] = useState("");

  const handleValidity = () => {
    const input = inputRef.current;
    if (input.validity.valueMissing)
      return input.setCustomValidity(
        "This field can not be empty! Please fill it in."
      );
    if (input.validity.patternMismatch)
      return input.setCustomValidity(
        "This field can not consist only of whitespaces! Please fill it in."
      );

    input.setCustomValidity("");
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
    handleValidity();
  };
  const handleCreateTodo = async (event) => {
    event.preventDefault();

    await handleFormSubmit(
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
        pattern=".+\S+.?"
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
