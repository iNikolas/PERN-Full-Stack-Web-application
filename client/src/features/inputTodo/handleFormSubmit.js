import {backend, pageLimit} from "../../common/constants";

let incrementCount = 0

const handleFormSubmit = async (event, description, setDescription, todos, setTodos, pagination, setCurrentPage) => {

    event.preventDefault()

    try {
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
                'Accept': 'application/vnd.api+json'
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
                incrementCount++
            } else {
                const totalTodos = +pagination.meta.totalTodos + incrementCount
                setCurrentPage(`${backend}/todos?page[offset]=${totalTodos - totalTodos % pageLimit}&page[limit]=${pageLimit}`)
                incrementCount = 0
            }
            setDescription('')
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleFormSubmit