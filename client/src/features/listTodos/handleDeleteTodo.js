import {backend} from "../../common/constants";

const handleDeleteTodo = async (todo_uid, todos, setTodos, user) => {
    try {
        const token = user.data.token

        const response = await fetch(`${backend}/todos/${todo_uid}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/vnd.api+json',
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 204) {
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