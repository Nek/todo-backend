'use strict';

const express = require('express');
const uuid = require('node-uuid');
const bodyParser = require('body-parser');

//http://stackoverflow.com/questions/29558528/change-the-array-collection-order-using-a-rest-api
//With PUT, clients can upload a whole new representation with 
//the order they want. They will request GET /api/v1/items, change 
//the order as they need, and submit it back with PUT /api/v1/items.
// Constants
const PORT = 8080;

// App
const app = express();
app.use('/', express.static(__dirname + '/todo-frontend/public'));
app.use(bodyParser());

app.get('/api', function (req, res) {
  res.send('Api root.\n');
});

const apiRoot = '/api/v1';

const todosById = {
	id1 : {
		done: false,
		description: "Wash dishes",
		id: "id1"
	},
	id2 : {
		done: true,
		description: "Clean car",
		id: "id2"
	},
	id3 : {
		done: false,
		description: "Pay rent",
		id: "id3"
	}};

const todos = ['id1', 'id2', 'id3'];

app.get(apiRoot + '/todos', function (req, res) {
	res.send(todos.map(function (id) {
		return todosById[id];
	}));
});

app.post(apiRoot + '/todos', function (req, res) {
	const id = uuid.v4();
	const todo = {
		done: req.body.done,
		description: req.body.description,
		id: id
	};
	todosById[id] = todo;
	todos.push(id);
	res.status(201);
	res.send(todo);
});

app.get(apiRoot + '/todos/ordering', function(req, res) {
	res.send(todos);
});

app.get(apiRoot + '/todos/ordering', function(req, res) {
	res.send(todos);
});

app.post(apiRoot + '/todos/:id', function(req, res) {
	const id = req.params.id;
	const oldTodo = todosById[id];
	if (oldTodo) {
		const newTodo = req.body;
		newTodo.id = id;
		todosById[id] = newTodo;
		res.send(newTodo);
	}
	else {
		res.status(404);
		res.send('No todo item with id: ' + req.params.id);
	}
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);