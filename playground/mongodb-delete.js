// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using destructuring

// When using Mongo, there is no need on create the connection first, it just have to be called
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if(error) {
        return console.log(`Unnable to connect to MongoDB Server`);
    }

    const db = client.db('TodoApp');
    
    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Clean room'})
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(error => {
    //         console.log(`Error while trying to delete a Todos document`);
    //     })
    
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'})
    //     .then(result => {
    //         console.log(result);
    //     });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then(result => {
    //         console.log(result); // returns the document which was deleted
    //     })


    // Using User Document
    // db.collection('Users').deleteMany({name: 'Max Grimm'})
    //     .then(result => {
    //         console.log(`DeleteMany() Users: `, result.result);
    //     });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5abbf7a317210b497b490c67')
    })
        .then(result => {
            console.log(`FindOneandDelete: `, result);
        })
        .catch(error => {
            console.log(`Error while deleting a User document: ${error}`);
        })

    // client.close();


});
