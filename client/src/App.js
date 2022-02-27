import './App.css';
import React, {useEffect, useState} from "react";
import ListTodos from "./features/listTodos/ListTodos";
import InputTodo from "./features/inputTodo/InputTodo";


function App() {

    const [todos, setTodos] = useState([]);

    const getAllTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos')
            const allTodos = await response.json()
            setTodos(allTodos)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getAllTodos()
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
