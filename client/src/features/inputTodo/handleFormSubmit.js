const handleFormSubmit = async (event, description, setDescription, todos, setTodos) => {

    event.preventDefault()

    try {
        const body = {description}
        const response = await fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const result = await response.json()

        if (result.todo_uid) {
            setTodos([...todos, result])
            setDescription('')
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleFormSubmit