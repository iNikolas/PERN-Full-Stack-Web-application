const handleDeleteTodo = async (todo_id, todos, setTodos) => {
    try {
        const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
            method: 'DELETE'
        })
        const deletionResult = await response.json()

        if (deletionResult.todo_id) {
            const newTodos = todos.filter(todoEntry => {
                return todoEntry.todo_id !== todo_id
            })
            setTodos(newTodos)
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleDeleteTodo