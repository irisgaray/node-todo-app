const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('../models/todo');

const dummyTodos = [ // creates dummy data for the DB
  {
    _id: new ObjectID(), 
    text: "First test todo" 
  },
  {
    _id: new ObjectID(), 
    text: "Second test todo", 
    completed: true, 
    completedAt: 333 
  },
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
    it('should get all Todos', done => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect(res => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done); // there is no need on pass done as function because this is not an assynchronous test
    });
});

describe('GET /Todos/:id', () => {
  it('should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
          // todo is the object that was sent from findById() method
          // res.status(200).send({todo});
          expect(res.body.todo.text).toBe(dummyTodos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404) // No need of doing a custome expect method
      .end(done);
  });

  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/123abc`)
    //   .get(`/todos/${{}}`) // is also valid, because the id format is validate in the find method
      .expect(404) // No need of doing a custome expect method
      .end(done);
  });

});

describe('DELETE Todos/:id', () => {
  it('should remove a todo by id', done => {

    let id = dummyTodos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.text).toBe(dummyTodos[0].text);
        // to use todo, it has to be send as the result from the delete method
      })
      .end((err, res) => {
          if(err) {
              return done(err);
          }

          // query database using findById
          Todo.findById(id)
            .then(todo => {
              expect(todo).toBeNull();
              done();
            })
            .catch(err => {
                done(err);
            })
      });
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if objectID is invalid', done => {
    request(app)
      .delete(`/todos/123aaa`)
      .expect(404)
      .end(done);
  });

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    
    let id = dummyTodos[0]._id.toHexString();
    let text = 'Updated from Mocha!';

    request(app)
      .patch(`/todos/${id}`)
      .send({
          completed: true, 
          //text: text (shorter version using js6)
          text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.text).toBe(text);
        // expect(res.body.todo.completedAt).toBeTruthy();
        expect(typeof res.body.todo.completedAt).toBe('number');        
      })
      .end(done);

  });

  it('should clear completedAt when todo is not completed', done => {
    
    let id = dummyTodos[1]._id.toHexString();
    let text = 'Updated during unit test';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect(res => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done);
    
  });
})


});