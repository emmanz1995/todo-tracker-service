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

    Todo.save((error, doc) => {
        if(error) {
            res.status(500).json({message: error});
            console.log('ERROR, failure to save new todos');
        } else {
            console.log('Successfully saved new todo!');
            res.status(201).json({doc});
        }
    });
});

router.get('/gettodos', (req, res) => {
    todo.find((error, doc) => {
        if(error) {
            console.log('ERROR '+ error);
            res.status(500).json({message: error});
        } else {
            console.log('Everything was fetched!');
            res.status(200).json({doc});
        }
    });
});

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

router.delete('/removetodo/:id', (req, res) => {
    todo.deleteOne({ _id: req.params.id }, (error, doc) => {
        if(!error) {
            console.log('Successfully Deleted Todo!');
            res.status(200).json({doc});
        } else {
            console.log('ERROR', error);
            res.status(500).json({message: error});
        }
    });
});

router.put('/updatetodo/:id', (req, res) => {
    const { title, content } = req.body;
    const todoId = req.params.id
    todo.findById(todoId).then((update) => {
        update.updateOne({ title, content })
        res.status(200).json(update)
    }).catch((error) => {
        console.log('ERROR', error);
        res.status(500).json(error);
    })
});

module.exports = router;
