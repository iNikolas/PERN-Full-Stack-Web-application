const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTERS

//create a todo

app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query('INSERT INTO todo (todo_uid, description) VALUES(uuid_generate_v4(), $1) RETURNING *', [description])

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//get all todos

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo')

        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a todo

app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE todo_uid = $1', [id])

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})
//update a todo

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_uid = $2 RETURNING *', [description, id])

        res.json(updateTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_uid = $1 RETURNING *', [id])

        deleteTodo.rowCount >= 1 ? res.json(deleteTodo.rows[0]) : res.json({success: 0})
    } catch (err) {
        res.json({success: 0, description: err.message})
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})