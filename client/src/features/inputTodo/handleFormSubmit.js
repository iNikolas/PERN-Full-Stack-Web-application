const handleFormSubmit = async (event, description, setDescription, todos, setTodos) => {

    event.preventDefault()

    try {
        const body = {
            data: {
                type: 'todo',
                attributes: {description}
            }
        }
        const response = await fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json'
            },
            body: JSON.stringify(body)
        })
        const resultRaw = await response.json()
        const result = resultRaw.data
        const newTodo_uid = result.id
        const newTodoDescription = result.attributes?.description

        if (newTodo_uid) {
            setTodos([...todos, {todo_uid: newTodo_uid, description: newTodoDescription}])
            setDescription('')
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleFormSubmit