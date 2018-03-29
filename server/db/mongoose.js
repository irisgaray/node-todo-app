let mongoose = require('mongoose');

mongoose.Promise = global.Promise; // setting up mongoose to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); // TodoApp is the name of the DB

// console.log(mongoose); // exports an object

module.exports = {
    mongoose
}