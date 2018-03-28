// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using destructuring

// When using Mongo, there is no need on create the connection first, it just have to be called
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if(error) {
        return console.log(`Unnable to connect to MongoDB Server`);
    }

    const db = client.db('TodoApp'); // TodoApp is the DB name
    
    db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID('5abbf35f17210b497b490a67')
        },
        {
            $set: { completed: true }
        }, 
        {
            returnOriginal: false // to not return the original object (before updated it)
        })
        .then(result => {
            console.log(result); // prints the object after update
        })
    
    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID('5abbe66d17210b497b4905ec')
        },
        {   // All the update operator must be declared into the second parameter/object
            $set: { name: 'Iris Garay' },
            $inc: { age: 4}
        }, 
        {
            returnOriginal: false
        }
    )
        .then(result => {
            console.log(result);
        })

    // client.close();


});
