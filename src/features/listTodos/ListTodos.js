import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import EditTodo from "./editTodo/EditTodo";
import ConfirmationPopup from "./confirmationPopup/ConfirmationPopup";
import handleDeleteTodo from "./handleDeleteTodo";
import "./ListTodos.css";
import { UserContext } from "../../common/userContext";
import convertDateToString from "./convertDateToString";
import handleEditTodo from "./editTodo/handleEditTodo";

const ListTodos = ({ todos, setTodos, currentPage, setCurrentPage }) => {
  const [user] = useContext(UserContext);
  const [working, setWorking] = useState(false);

  const handleCallback =
    (todo_uid, todos, setTodos, user, currentPage, setCurrentPage) => () =>
      handleDeleteTodo(
        todo_uid,
        todos,
        setTodos,
        user,
        currentPage,
        setCurrentPage
      );

  const handleToggleTodoState = async (
    description,
    todos,
    setTodos,
    todo_uid,
    user,
    isDone
  ) => {
    try {
      setWorking(true);
      await handleEditTodo(
        description,
        todos,
        setTodos,
        todo_uid,
        user,
        isDone
      );
    } catch (error) {
      console.error(error);
    } finally {
      setWorking(false);
    }
  };

  const todosMapped = todos.map((todoEntry) => {
    const { todo_uid, created, isDone, description } = todoEntry;

    return (
      <tr
        className={`position-relative ${isDone ? "is-one-row-style" : ""}`}
        key={todo_uid}
      >
        <td className="text-center align-middle btn-td">
          <input
            onChange={(event) => {
              handleToggleTodoState(
                description,
                todos,
                setTodos,
                todo_uid,
                user,
                event.target.checked
              );
            }}
            disabled={working}
            defaultChecked={isDone}
            type="checkbox"
            className="position-absolute is-done-checkbox"
          />
          <div
            className={`position-absolute ${
              isDone ? "is-done-strikethrough" : ""
            }`}
          ></div>
          {convertDateToString(created)}
        </td>
        <td className="w-100 description-cell">{todoEntry.description}</td>
        <td className="text-center align-middle position-relative btn-td">
          <EditTodo todoEntry={todoEntry} todos={todos} setTodos={setTodos} />
        </td>
        <td className="text-center align-middle position-relative btn-td">
          <ConfirmationPopup
            question="Please, confirm your action"
            details="Are you sure want irreversibly delete this entry?"
            callback={handleCallback(
              todo_uid,
              todos,
              setTodos,
              user,
              currentPage,
              setCurrentPage
            )}
          />
        </td>
      </tr>
    );
  });

  return (
    <Table className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th>Created</th>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className="todo-table">{todosMapped}</tbody>
    </Table>
  );
};

export default ListTodos;
