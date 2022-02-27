import React from "react";
import Table from 'react-bootstrap/Table'
import EditTodo from "./editTodo/EditTodo";
import handleDeleteTodo from "./handleDeleteTodo";

const ListTodos = ({todos, setTodos}) => {

    const todosMapped = todos.map(todoEntry => {
        const todo_id = todoEntry.todo_id
        return (
            <tr key={todo_id}>
                <td>{todoEntry.description}</td>
                <td><EditTodo todoEntry={todoEntry} todos={todos} setTodos={setTodos}/></td>
                <td>
                    <button onClick={() => handleDeleteTodo(todo_id, todos, setTodos)}
                            className='btn btn-danger'>Delete
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <Table className='mt-5' striped bordered hover>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todosMapped}
                </tbody>
            </Table>
        </>
    )
}

export default ListTodos