const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorController = require('./controllers/errorController')
const todoController = require('./controllers/todoController')

app.use(cors())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))

app.post('/todos', todoController.createTodo)

app.get('/todos', todoController.getAllTodos)
app.get('/todos/:id', todoController.getTodo)

app.put('/todos/:id', todoController.updateTodo)

app.delete('/todos/:id', todoController.deleteTodo)

app.use(errorController.internalServerError)
app.use(errorController.pageNotFoundError)

app.listen(5000, () => {
    console.log('Server has started on port 5000')
})