const handleEditTodo = async (modalDescription, todos, setTodos, todo_uid) => {
    const body = {description: modalDescription}
    const response = await fetch(`http://localhost:5000/todos/${todo_uid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const result = await response.json()

    if (result.todo_uid) {
        const newTodos = todos.map(entry => {
            if (entry.todo_uid === result.todo_uid) return {todo_uid: entry.todo_uid, description: result.description}
            return entry
        })
        setTodos(newTodos)
    }
}

export default handleEditTodo