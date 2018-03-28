// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using destructuring

// When using Mongo, there is no need on create the connection first, it just have to be called
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if(error) {
        return console.log(`Unnable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB server`);

    const db = client.db('TodoApp');
    
    // .find() returns a cursor/pointer of the documents and this pointer
    // has a los of properties that can be used...
    db.collection('Todos').find().count().then(count => {
        console.log(`Todos total: ${count}`);
        // console.log(JSON.stringify(count, undefined, 2));
    }, error => {
        console.log(`Unnable to fetch Todos ${error}`)
    });

    db.collection('Users').find({name: 'Max Grimm'}).toArray().then(users => {
        console.log(`Users:`);
        console.log(JSON.stringify(users, undefined, 2));
    }).catch(error => {
        console.log(`Unnable to fetch data from Users document`);
    });

    // client.close();

});
