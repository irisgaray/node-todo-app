const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('../models/todo');

const dummyTodos = [ // creates dummy data for the DB
    { text: "First test todo" },
    { text: "Second test todo" },
];

beforeEach((done) => { // deleting all the data from DB before executes each test
    Todo.remove({}).then(() => {
        Todo.insertMany(dummyTodos);
    }).then(() => done());
});

describe('POST / todos', () => {
    it('should create a new Todo', (done) => {

        let text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({text: text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find()
                .then(todos => {
                    expect(todos.length).toBe(1); // checks if made an insert
                    expect(todos[0].text).toBe(text); // 
                    done();
                })
                .catch(err => {
                    done();
                });
        })
    });

    it('should not create Todo with invalid body data', (done) => {

        request(app)
            .post('/todos') // setting url
            .send({}) //sending invalid data
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then(todos => {
                    expect(todos.length).toBe(2); // If test fails, it should save the doc into DB
                    done();
                })
                .catch(err => done(err) )
            });
    });    
});

describe('GET /Todos', () => {
    it('should get all Todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect(res => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done); // there is no need on pass done as function because this is not an assynchronous test
    });
});