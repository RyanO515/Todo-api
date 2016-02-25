var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore");

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
app.get("/", function (req, res) {
	res.send('Todo API Root');
});

// GET todos

app.get("/todos", function (req, res) {
	res.json(todos);
});

//GET todos/:id

app.get('/todos/:id', function (req, res) {
	var todoId = Number(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoId});

    if (matchedTodo) {
    	res.json(matchedTodo);
    } else {
    	res.status(404).send();
    }
});

// POST /todos

app.post('/todos', function (req, res) {
	var body = req.body;

    body = _.pick(body, 'description', 'completed');  // if other fields entered, only return desc & completed

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }  // validate fields and return 400 status if completed is not a boolean, desc not a string, or without text entry

    body.description = body.description.trim();  // trim off before or after white space

    body.id = todoNextId++;  // add 1 to id after assignment

    todos.push(body);  // push body object to todos

	res.json(body);
});


app.listen(PORT, function () {
	console.log("Express listening on port " + PORT + "!");
});








