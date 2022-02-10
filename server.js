const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 5001;
const mongoose = require('mongoose');
const db = mongoose.connection;
// const { MONGOURI } = require('./keys');
const dotenv = require('dotenv');

dotenv.config()

const { DB_CONNECTION_STRING } = process.env;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.once('connected', () => {
    console.log('Mongo connection established!');
});

db.on('error', (err) => {
    console.log(err);
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('./models/todos.model');

app.use(express.json());
app.use(require('./routes/todo.route'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Todo Service' });
});

app.listen(PORT, () => {
    console.log(`App running on post ${PORT}`);
});
