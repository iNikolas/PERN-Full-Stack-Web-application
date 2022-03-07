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
            console.log(pagination)
            if (todos.length < pageLimit) {
                setTodos([...todos, {todo_uid: newTodo_uid, description: newTodoDescription}])
            } else {
                const nextPage = pagination.links.next
                const lastPage = pagination.links.last
                const currentPage = pagination.links.self
                const totalTodos = pagination.meta.totalTodos

                if (!nextPage) {
                    const currentOffset = currentPage.match(/page\[offset]=(?<pageOffset>\d+)/).groups.pageOffset || '0'
                    const newOffset = +currentOffset + pageLimit
                    setCurrentPage(`${backend}/todos?page[offset]=${newOffset}&page[limit]=${pageLimit}`)
                }
                if (nextPage && !!(totalTodos % pageLimit)) {
                    setCurrentPage(lastPage)
                }
                if (nextPage && !(totalTodos % pageLimit)) {
                    const lastOffset = lastPage.match(/page\[offset]=(?<pageOffset>\d+)/).groups.pageOffset || '0'
                    const newOffset = +lastOffset + pageLimit
                    setCurrentPage(`${backend}/todos?page[offset]=${newOffset}&page[limit]=${pageLimit}`)
                }
            }
            setDescription('')
        }
    } catch (error) {
        console.error(error.message)
    }
}

export default handleFormSubmit