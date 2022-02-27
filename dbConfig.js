const mongoose = require('mongoose');
const dotenv = require('dotenv');
const db = mongoose.connection;

dotenv.config()

const { MONGOURI } = process.env;

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.once('connected', () => {
    console.log('Mongo connection established!');
});

db.on('error', (err) => {
    console.log(err);
});
