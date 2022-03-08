import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import ListTodos from "./features/listTodos/ListTodos";
import InputTodo from "./features/inputTodo/InputTodo";
import handleGetTodos from "./handleGetTodos";
import Paginator from "./features/paginator/Paginator";
import { INITIAL_LINK, PAGE_LIMIT } from "./common/constants";
import RegisterPage from "./features/registerPage/RegisterPage";
import { UserContext } from "./common/userContext";
import Header from "./features/header/Header";
import Dashboard from "./features/dashboard/Dashboard";



function App() {
  const [user, setUser] = useContext(UserContext);
  const userId = user?.data?.id;
  const [showDashboard, setShowDashboard] = useState(false);
  const [todos, setTodos] = useState([]);
  const [working, setWorking] = useState(false)

  const [pagination, setPagination] = useState({
    links: {
      self: INITIAL_LINK,
      first: INITIAL_LINK,
      prev: null,
      next: null,
      last: INITIAL_LINK,
    },
    meta: { totalPages: null },
  });
  const [currentPage, setCurrentPage] = useState(pagination.links.self);

  const isEmptyTodoList = !todos.length && pagination.links.self === pagination.links.first
  const isScarcity = todos.length < PAGE_LIMIT && pagination.links.next
  const isOverflow = todos.length > PAGE_LIMIT

  useEffect(() => {
    if (userId && !working) {
      handleGetTodos(currentPage, setTodos, setPagination, user, setWorking)
    };
  }, [userId, currentPage, isScarcity, isOverflow, isEmptyTodoList]);

  if (!user) return <RegisterPage setUser={setUser} />;

  return (
    <div>
      <Header
        setCurrentPage={setCurrentPage}
        setTodos={setTodos}
        setShowDashboard={setShowDashboard}
      />
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <div className="container d-flex flex-column align-items-center">
        <div className="w-100">
          <InputTodo
            todos={todos}
            setTodos={setTodos}
            pagination={pagination}
            setPagination={setPagination}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ListTodos
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          todos={todos}
          setTodos={setTodos}
        />
        {pagination.meta.totalPages > 1 && (
          <Paginator pagination={pagination} setCurrentPage={setCurrentPage} />
        )}
      </div>
      <Dashboard
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
      />
    </div>
  );
}

export default App;
