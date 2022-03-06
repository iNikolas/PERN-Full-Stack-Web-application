import './App.css';
import React, {useContext, useEffect, useState} from "react";
import ListTodos from "./features/listTodos/ListTodos";
import InputTodo from "./features/inputTodo/InputTodo";
import handleGetTodos from "./handleGetTodos";
import Paginator from "./features/paginator/Paginator";
import {backend, pageLimit} from './common/constants'
import RegisterPage from "./features/registerPage/RegisterPage";
import {UserContext} from "./common/userContext";
import Header from "./features/header/Header";
import Dashboard from "./features/dashboard/Dashboard";


function App() {

    const [user, setUser] = useContext(UserContext)
    const userId = user?.data?.id
    const [showDashboard, setShowDashboard] = useState(false)
    const [todos, setTodos] = useState([])
    const [pagination, setPagination] = useState({
        links: {self: `${backend}/todos?page[offset]=0&page[limit]=${pageLimit}`},
        meta: {totalPages: null}
    })
    const [currentPage, setCurrentPage] = useState(pagination.links.self)

    useEffect(() => {
        if (userId) handleGetTodos(currentPage, setTodos, setPagination, user)
    }, [userId, currentPage])

    if (!user) return <RegisterPage setUser={setUser}/>

    return (
        <>
            <Header setCurrentPage={setCurrentPage} setTodos={setTodos} setShowDashboard={setShowDashboard}/>
            <h1 className='text-center mt-5'>PERN Todo List</h1>
            <div className='container d-flex flex-column align-items-center'>
                <div className='w-100'><InputTodo todos={todos} setTodos={setTodos} pagination={pagination}
                                                  setPagination={setPagination} setCurrentPage={setCurrentPage}/></div>
                <ListTodos todos={todos} setTodos={setTodos}/>
                {pagination.meta.totalPages > 1 && <Paginator pagination={pagination} setCurrentPage={setCurrentPage}/>}
            </div>
            <Dashboard showDashboard={showDashboard} setShowDashboard={setShowDashboard}/>
        </>
    );
}

export default App;
