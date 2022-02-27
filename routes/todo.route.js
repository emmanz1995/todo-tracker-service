const todo = require('../models/todos.model');
const express = require('express');
const router = express();
const { createTodo, getTodos, updateTodo, deleteTodo, getTodo } = require('../controllers/todo.controller');

router.post('/createtodos', createTodo);

router.get('/gettodos', getTodos);

router.get('/gettodos/:id', (req, res) => {
    todo.findById({_id: req.params.id}, (error, doc) => {
        if(error) {
            console.log('ERROR', error);
            res.json({ message: error });
        } else {
            console.log('Fetched todo!');
            res.status(200).json({ doc });
        }
    });
});

router.delete('/removetodo/:id', deleteTodo);

router.put('/updatetodo/:id', updateTodo);

module.exports = router;
