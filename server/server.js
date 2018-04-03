const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json()); // middleware

app.post('/todos', (req, res) => {

    let todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then(doc => {
            res.status(200).send(doc);
        })
        .catch(error => {
            res.status(400).send(error);
        });

});

app.get('/todos', (req, res) => {
    Todo.find()
        .then(todos => {
            res.status(200).send({todos});
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// GET /todos/id:1234
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  
  // Validate id using isValid
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
  Todo.findById(id)
    .then(todo => {
        if(!todo) {
            return res.status(404).send('Unable to find Todo document');
            // return console.log(`Unable to find Todo document`);
        }
        res.status(200).send({todo});
        // console.log(`${todo}`);
    })
    .catch(error => {
        console.log(`Unexpected error > ${error}`);
    });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  let id = req.params.id;

  // validate id
  if(!ObjectID.isValid(id)){ // not valid? return 404
    return res.status(404).send('ID is not valid');
  }
  
  //remove todo by id
  Todo.findByIdAndRemove(id)
    .then(todo => {

        //error 404, empty body
        if(!todo){
            return res.status(404).send('Document does not exist');
        }
        //sucess 200
        console.log('Removed Document: ', todo);
        res.status(200).send(todo);
    })
    .catch(error => {
        res.status(404).send(error);
    })

});


app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});

module.exports = {
    app
}