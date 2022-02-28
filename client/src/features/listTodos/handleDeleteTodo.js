const handleDeleteTodo = async (todo_uid, todos, setTodos) => {
    try {
        const response = await fetch(`http://localhost:5000/todos/${todo_uid}`, {
            method: 'DELETE'
        })
        const deletionResult = await response.json()

        if (deletionResult.todo_uid) {
            const newTodos = todos.filter(todoEntry => {
                return todoEntry.todo_uid !== todo_uid
            })
            setTodos(newTodos)
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleDeleteTodo