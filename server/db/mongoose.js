let mongoose = require('mongoose');

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://admin:admin@ds131119.mlab.com:31119/node-mongoose-app'
}

mongoose.Promise = global.Promise; // setting up mongoose to use promises
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'); // TodoApp is the name of the DB
mongoose.connect(process.env.MONGOLAB_URI ? db.mlab : db.localhost); // heroku config:set MONGOLAB_URI=mongodb://user:password@ds131119.mlab.com:31119/node-mongoose-app

module.exports = {
    mongoose
}