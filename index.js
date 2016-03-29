'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use('/', express.static(__dirname + '/todo-frontend/public'));


app.get('/api', function (req, res) {
  res.send('Api root.\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);