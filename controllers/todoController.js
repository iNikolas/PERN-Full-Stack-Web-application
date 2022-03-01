const pool = require('../db')

module.exports = {
    createTodo: async (req, res, next) => {
        try {
            const type= req.body.data.type
            const description = req.body.data.attributes.description || null
            const newTodoRequest = await pool.query(`INSERT INTO ${type} (todo_uid, description) VALUES(uuid_generate_v4(), $1) RETURNING *`, [description])
            const newTodo = newTodoRequest.rows[0]
            const todo_uid = newTodo.todo_uid
            const resData = {
                data: {
                    type: "todo",
                    id: todo_uid,
                    attributes: {
                        description: newTodo.description
                    },
                    links: {
                        self: `http:/localhost:5000/todos/${todo_uid}`
                    }
                }
            }

            res.set({
                'Content-Type': 'application/vnd.api+json',
                'Location': `http:/localhost:5000/todos/${todo_uid}`
            })
            res.status(201)
            res.json(resData)
        } catch (err) {
            next(err)
        }
    },
    getAllTodos: async (req, res, next) => {
        try {
            const allTodosRequest = await pool.query('SELECT * FROM todo')
            const allTodos = allTodosRequest.rows
            const resData = {
                links: {
                    self: `http://localhost:5000${req.originalUrl}`
                },
                data: []
            }

            allTodos.forEach(todo => {
                const type = 'todo'
                const id = todo.todo_uid
                const description = todo.description
                const todoData = {type, id, attributes: {description}}

                resData.data.push(todoData)
            })

            res.set({
                'Content-Type': 'application/vnd.api+json',
            })
            res.status(200)
            res.json(resData)
        } catch (err) {
            next(err)
        }
    },
    getTodo: async (req, res, next) => {
        try {
            const {id} = req.params
            const todoRequest = await pool.query('SELECT * FROM todo WHERE todo_uid = $1', [id])
            const todoData = todoRequest.rows
            const resData = {
                links: {
                    self: `http://localhost:5000${req.originalUrl}`
                },
                data: null,
            }

            if (todoData.length) {
                const type = 'todo'
                const id = todoData[0].todo_uid
                const description = todoData[0].description
                const relationships = null
                resData.data = {type, id, attributes: {description}, relationships}
            }
            res.set({
                'Content-Type': 'application/vnd.api+json',
            })
            res.status(200)
            res.json(resData)
        } catch (err) {
            next(err)
        }
    },
    updateTodo: async (req, res, next) => {
        try {
            const {id} = req.params
            const bodyId = req.body.data.id

            if (id !== bodyId) throw new Error('Request param\'s ID and body ID doesn\'t match!')

            const description = req.body.data.attributes.description
            const type = req.body.data.type
            const updateTodoRaw = await pool.query(`UPDATE ${type} SET description = $1 WHERE todo_uid = $2 RETURNING *`, [description, id])
            const updateTodo = updateTodoRaw.rows[0]

            if (!updateTodo) next()

            const resData = {
                links: {
                    self: `http://localhost:5000${req.originalUrl}`
                },
                data: null,
            }

            const relationships = null
            resData.data = {type, id, attributes: {description}, relationships}

            res.json(resData)
        } catch (err) {
            next(err)
        }
    },
    deleteTodo: async (req, res, next) => {
        try {
            const {id} = req.params
            const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_uid = $1 RETURNING *', [id])

            if (deleteTodo.rowCount >= 1) {
                res.status(204)
                res.send()
            } else {
                next()
            }
        } catch (err) {
            next(err)
        }
    }
}