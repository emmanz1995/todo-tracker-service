const Todo = require('../models/todos.model');

const createTodo = async (req, res) => {
    const { title, content } = req.body;
    try {
        if(!title || !content) {
            return res.status(422).json({
                message: 'Write the title and or content!',
            })
        }
        const addTodo = new Todo({
            title,
            content
        })
        await addTodo.save()
        res.status(201).json({
            message: 'Successfully added the new todo!',
            data: addTodo
        })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
        // throw new ErrorException(ErrorCode.NotFound)
    }
}

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().select('-__v')
        res.status(200).json({
            message: 'Retrieved all the Todos!',
            data: todos
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const getTodo = async (req, res) => {
    const todoId = req.params.id;
    try {
        const findSingleTodo = await Todo.findById(todoId);
        res.status(200).json(findSingleTodo);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const updateTodo = async (req, res) => {
    const { title, content } = req.body;
    const todoId = req.params.id;
    try {
        let findTodoAndUpdate = await Todo.findByIdAndUpdate(todoId, {
                title, content
            }, {
            new: true
        })
        res.status(200).json({
            message: 'successfully updated Todo!',
            data: findTodoAndUpdate
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const deleteTodo = async (req, res) => {
    const postId = req.params.id;
    try {
        const findTodoAndDelete = await Todo.findByIdAndDelete(postId)
        res.status(200).json({
            message: 'Deleted Todo Successfully!',
            data: findTodoAndDelete
        })
    } catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createTodo, getTodos,
    getTodo, updateTodo,
    deleteTodo
};
