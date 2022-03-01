import './App.css';
import React, {useEffect, useState} from "react";
import ListTodos from "./features/listTodos/ListTodos";
import InputTodo from "./features/inputTodo/InputTodo";
import handleGetAllTodos from "./handleGetAllTodos";


function App() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        handleGetAllTodos(setTodos)
    }, [])

    return (
        <>
            <h1 className='text-center mt-5'>PERN Todo List</h1>
            <div className='container'>
                <InputTodo todos={todos} setTodos={setTodos}/>
                <ListTodos todos={todos} setTodos={setTodos}/>
            </div>
        </>
    );
}

export default App;
