const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5abd4ca25c599a29e037c494';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then(todos => {
//     console.log(`Todos: ${todos}`, todos);
// });

// Todo.findOne({
//     _id: id   
// }).then(todo => {
//     if(!todo) {
//         return console.log(`id not found!!`);
//     }
//     console.log(`Todo:`, todo);
// });

// Todo.findById(id)
//     .then(todo =>{
//         console.log(`Todo by Id: ${todo}`); // ${[todo]}
//     })
//     .catch(error => {
//         console.log(error);
//     });

const userId = '5abcee65aa3ad31b4c9f0c32';

User.findById(userId)
    .then(user => {
        if(!user){
            return console.log(`Unnable to find user!!`);
        }
        console.log(`${JSON.stringify(user, undefined, 2)}`);
    })
    .catch(error => {
        console.log(`Something went wrong > ${error}`);
    })