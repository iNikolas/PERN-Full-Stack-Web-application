const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errorController')

//middleware
app.use(cors())
app.use(bodyParser.json({type: 'application/vnd.api+json'})) //req.body

//ROUTERS

//create a todo

app.post('/todos', async (req, res, next) => {
    try {
        const description = req.body.data?.attributes?.description
        const newTodoRequest = await pool.query('INSERT INTO todo (todo_uid, description) VALUES(uuid_generate_v4(), $1) RETURNING *', [description])
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
})

//get all todos

app.get('/todos', async (req, res, next) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo')

        res.json(allTodos.rows)
    } catch (err) {
        next(err)
    }
})

//get a todo

app.get('/todos/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE todo_uid = $1', [id])

        res.json(todo.rows[0])
    } catch (err) {
        next(err)
    }
})
//update a todo

app.put('/todos/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_uid = $2 RETURNING *', [description, id])

        res.json(updateTodo.rows[0])
    } catch (err) {
        next(err)
    }
})

//delete a todo

app.delete('/todos/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_uid = $1 RETURNING *', [id])

        deleteTodo.rowCount >= 1 ? res.json(deleteTodo.rows[0]) : res.json({success: 0})
    } catch (err) {
        next(err)
    }
})

app.use(errorController.internalServerError)
app.use(errorController.pageNotFoundError)

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})