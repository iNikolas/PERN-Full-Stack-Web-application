import React, { useState } from "react";
import EditTodoModal from "./EditTodoModal";

const EditTodo = ({ todoEntry, todos, setTodos }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <EditTodoModal
        show={show}
        setShow={setShow}
        todoEntry={todoEntry}
        todos={todos}
        setTodos={setTodos}
      />
      <button onClick={() => setShow(true)} className="btn btn-warning">
        Edit
      </button>
    </>
  );
};

export default EditTodo;
