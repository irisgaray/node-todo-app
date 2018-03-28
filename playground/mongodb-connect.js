// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using destructuring

// let obj = new ObjectID();
// console.log(obj);

// When using Mongo, there is no need on create the connection first, it just have to be called
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if(error) {
        return console.log(`Unnable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB server`);

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
        
    //     if(error){
    //         return console.log(`Unnable to insert new record`);
    //     } 
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Max Grimm',
    //     age: 25,
    //     location: 'Ireland'
    // }, (error, result) => {
        
    //     if(error){
    //         return console.log(`Unnable to insert new record`);
    //     } 
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });

    client.close();

})
