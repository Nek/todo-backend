'use strict';

const express = require('express');

//http://stackoverflow.com/questions/29558528/change-the-array-collection-order-using-a-rest-api
//With PUT, clients can upload a whole new representation with 
//the order they want. They will request GET /api/v1/items, change 
//the order as they need, and submit it back with PUT /api/v1/items.
// Constants
const PORT = 8080;

// App
const app = express();
app.use('/', express.static(__dirname + '/todo-frontend/public'));


app.get('/api', function (req, res) {
  res.send('Api root.\n');
});

const apiRoot = '/api/v1';

app.get(apiRoot + '/todos', function (req, res) {
  res.send([{
		done: false,
		description: "Wash dishes",
		id: "id1"
	},
	{
		done: true,
		description: "Clean car",
		id: "id2"
	},
	{
		done: false,
		description: "Pay rent",
		id: "id3"
	}]);
});

app.get(apiRoot + '/todos/:id', function(req, res) {
    res.send({id:req.params.id, done: false, description: "description"});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);