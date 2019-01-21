const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const mongoose = require('./db/mongoose');
const Todo = require('./models/todo')
const User = require('./models/user')

const app = express();

app.use(bodyParser.json());

// setup POST #create route  
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then(doc => {
    res.send(doc);
  }, err => {
    res.status(400).send(err);
  })
});

// setup GET #index route
app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({
      todos,
      statusCode: 200
    });
  }, err => {
    res.status(400).send(err)
  })
})

// setup GET #show route
app.get('/todos/:id', (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }, err => {
    res.status(400).send(err);
  })
});

app.listen(3000, () => {
  console.log('Started on Port 3000');
});

module.exports = app;