const handleGetTodos = async (currentPage, setTodos, setPagination, user) => {
    try {
        const token = user.data.token

        const responseRaw = await fetch(currentPage, {
            headers: {
                'Accept': 'application/vnd.api+json',
                Authorization: `Bearer ${token}`
            }
        })

        const response = await responseRaw.json()
        const allTodosRaw = response.data
        const {links, meta} = response
        const allTodos = []

        setPagination({links, meta})

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

export default handleGetTodos