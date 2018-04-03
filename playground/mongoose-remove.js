const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Removes all records
// Todo.remove({})
//   .then(res => {
//     console.log(`Todo.remove():`, res);
//   });

// Returns the removed document after execution 
Todo.findOneAndRemove({_id: '5ac3cd2617210b497b49dd4d'})
  .then(todo => {
      console.log(`findOneAndRemove(): `, todo);
  });

// Returns the removed document after execution 
// Todo.findByIdAndRemove('5ac3cc6317210b497b49dcf0')
//   .then(todo => {
//       console.log(`Removed todo: `, todo);
//   });
