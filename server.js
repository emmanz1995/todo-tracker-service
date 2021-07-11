const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5000;
const mongoose = require('mongoose');
// const { response } = require('express');
const db = mongoose.connection;
const { MONGOURI } = require('./keys');

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.once('connected', () => {
    console.log('Mongo connection established!')
});

db.on('error', (err) => {
    console.log(err);
});

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

require('./models/todos.model');

app.use(express.json());
app.use(require('./routes/todo.route'));

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Todo Service'});
});

app.listen(PORT, () => {
    console.log(`App running on post ${PORT}`);
});