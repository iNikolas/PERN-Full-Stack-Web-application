const handleEditTodo = async (modalDescription, todos, setTodos, todo_id) => {
    const body = {description: modalDescription}
    const response = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const result = await response.json()

    if (result.todo_id) {
        const newTodos = todos.map(entry => {
            if (entry.todo_id === result.todo_id) return {todo_id: entry.todo_id, description: result.description}
            return entry
        })
        setTodos(newTodos)
    }
}

export default handleEditTodo