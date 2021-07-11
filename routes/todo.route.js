const todo = require('../models/todos.model');
const express = require('express');
const router = express();

router.post('/createtodos', (req, res) => {
    const { title, content } = req.body;
    if(!title || !content) {
        res.status(422).json({ message: 'Title or content is missing' });
    }

    const Todo = new todo({
        title,
        content
    });

    Todo.save().then((savedTodos) =>{
        res.status(201).json({ message: 'Successfully saved Todos' });
    })
    .catch((err) =>{
        res.json({ message: err })
    })
})

router.get('/gettodos', (req, res) => {
    todo.find()
    .then((todos) => {
        res.status(200).json({todos})
    })
    .catch((err) => {
        res.status(404).json({message: err})
    })
})

router.get('/gettodos/:id', (req, res) => {
    const { _id } = req.params;
    todo.findOne(_id)
    .then((todoId) => {
        res.status(200).json({ todoId })
    })
    .catch((err) => {
        res.json({ message: err })
    })
})

router.delete('/removetodo/:id', (req, res) => {
    const { _id } = req.params;
    todo.deleteOne(_id)
    .then((todoId) => {
        res.status(200).json({ todoId })
    })
    .catch((err) => {
        res.json({ message: err });
    })
})

router.put('/updatetodo/:id', (req, res) => {
    const { title, content } = req.body;
    const { _id } = req.params;
    const Todo = todo.updateOne({
        title,
        content
    })
    Todo.updateOne(_id)
    .then((todoId) => {
        res.status(200).json({ todoId })
    })
    .catch((err) => {
        res.json({message: err});
    });
});

module.exports = router;