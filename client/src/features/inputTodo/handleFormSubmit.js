import {backend, pageLimit} from "../../common/constants";

const handleFormSubmit = async (event, description, setDescription, todos, setTodos, pagination, setCurrentPage, user) => {

    event.preventDefault()

    try {
        const token = user.data.token
        const body = {
            data: {
                type: 'todo',
                attributes: {description}
            }
        }
        const response = await fetch(`${backend}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const resultRaw = await response.json()
        const result = resultRaw.data
        const newTodo_uid = result.id
        const newTodoDescription = result.attributes?.description

        if (newTodo_uid) {
            if (todos.length < pageLimit) {
                setTodos([...todos, {todo_uid: newTodo_uid, description: newTodoDescription}])
            } else {
                const totalTodos = pagination.meta.totalTodos
                const totalPages = Math.floor(totalTodos / pageLimit)
                setCurrentPage(`${backend}/todos?page[offset]=${totalPages * pageLimit}&page[limit]=${pageLimit}`)

            }
            setDescription('')
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleFormSubmit