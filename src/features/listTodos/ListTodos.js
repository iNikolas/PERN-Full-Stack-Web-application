import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import EditTodo from "./editTodo/EditTodo";
import ConfirmationPopup from "./confirmationPopup/ConfirmationPopup";
import handleDeleteTodo from "./handleDeleteTodo";
import "./ListTodos.css";
import { UserContext } from "../../common/userContext";
import convertDateToString from "./convertDateToString";

const ListTodos = ({ todos, setTodos, currentPage, setCurrentPage }) => {
  const [user] = useContext(UserContext);

  const handleCallback = (todo_uid, todos, setTodos, user, currentPage, setCurrentPage) => () => handleDeleteTodo(todo_uid, todos, setTodos, user, currentPage, setCurrentPage);

  const todosMapped = todos.map((todoEntry) => {

    const {todo_uid, created} = todoEntry

    return (
      <tr key={todo_uid}>
        <td className="text-center align-middle btn-td">
          {convertDateToString(created)}
        </td>
        <td className="w-100 overflow-hidden">{todoEntry.description}</td>
        <td className="text-center align-middle btn-td">
          <EditTodo todoEntry={todoEntry} todos={todos} setTodos={setTodos} />
        </td>
        <td className="text-center align-middle btn-td">
          <ConfirmationPopup question='Please, confirm your action' details='Are you sure want irreversibly delete this entry?' callback={handleCallback(todo_uid, todos, setTodos, user, currentPage, setCurrentPage)} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
        <tr>
          <th>Created</th>
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
