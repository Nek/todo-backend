'use strict';

const express = require('express');
const uuid = require('node-uuid');
const bodyParser = require('body-parser');

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

let todosById = {};

let todos = ['id1', 'id2', 'id3'];

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

app.put(apiRoot + '/todos', function (req, res) {
	const todosJson = req.body;
	todosById = todosJson.reduce(function (map, item) {
				map[item.id] = item;
				return map;
			}, {});
	todos = todosJson.map(function (item) {return item.id;});
	res.status(200);
	res.send('Bulk todo update was successful');
});

app.get(apiRoot + '/todos/ordering', function(req, res) {
	res.send(todos);
});

app.put(apiRoot + '/todos/ordering', function(req, res) {
	todos = req.body;
	res.status(200);
	res.send('Todos ordering change is successful');
});

app.post(apiRoot + '/todos/:id', function(req, res) {
	const id = req.params.id;
	const oldTodo = todosById[id];
	if (oldTodo) {
		const newTodo = req.body;
		newTodo.id = id;
		todosById[id] = newTodo;
		res.status(200);
		res.send(newTodo);
	}
	else {
		res.status(404);
		res.send('No todo item with id: ' + req.params.id);
	}
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);