const handleGetAllTodos = async (setTodos) => {
    try {
        const response = await fetch('http://localhost:5000/todos', {
            headers: {
                'Accept': 'application/vnd.api+json'
            }
        })
        const allTodosRaw = (await response.json()).data
        const allTodos = []

        allTodosRaw.forEach(todoEntry => {
            const todo_uid = todoEntry.id
            const description = todoEntry.attributes.description
            const newTodo = {todo_uid, description}

            allTodos.push(newTodo)
        })

        setTodos(allTodos)
    } catch (error) {
        console.error(error.message)
    }
}

export default handleGetAllTodos