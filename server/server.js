const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

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


app.listen(3000, () => {
    console.log(`Started on port 3000`);
});

module.exports = {
    app
}