import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import EditTodo from "./editTodo/EditTodo";
import handleDeleteTodo from "./handleDeleteTodo";
import "./ListTodos.css";
import { UserContext } from "../../common/userContext";

const ListTodos = ({ todos, setTodos, currentPage, setCurrentPage }) => {
  const [user] = useContext(UserContext);

  const todosMapped = todos.map((todoEntry) => {
    const todo_uid = todoEntry.todo_uid;
    return (
      <tr key={todo_uid}>
        <td className="w-100 overflow-hidden">{todoEntry.description}</td>
        <td className="text-center align-middle btn-td">
          <EditTodo todoEntry={todoEntry} todos={todos} setTodos={setTodos} />
        </td>
        <td className="text-center align-middle btn-td">
          <button
            onClick={() =>
              handleDeleteTodo(
                todo_uid,
                todos,
                setTodos,
                user,
                currentPage,
                setCurrentPage
              )
            }
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{todosMapped}</tbody>
      </Table>
    </>
  );
};

export default ListTodos;
