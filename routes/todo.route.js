const todo = require('../models/todos.model');
const express = require('express');
const router = express();
const { createTodo, getTodos, updateTodo, deleteTodo, getTodo } = require('../controllers/todo.controller');

router.post('/createtodo', createTodo);

router.get('/gettodos', getTodos);

router.get('/gettodos/:id', getTodo);

router.delete('/removetodo/:id', deleteTodo);

router.put('/updatetodo/:id', updateTodo);

module.exports = router;
