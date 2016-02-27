var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/playground.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	 // force: true
}).then(function () {
	console.log("everything is synced");

	return Todo.findById(2).then(function (todo) {
		if (todo) {
			console.log(todo.toJSON());
		} else {
			console.log("Todo not found...")
		}
	});

	// Todo.create({
	// 	description: 'Wash Car'
	// }).then(function (todo) {
	// 	return Todo.create({
	// 		description: 'Raise children'
	// 	});
	// }).then(function () {
	// 	// return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%Children%'
	// 			}
	// 		}
	// 	});
	// }).then(function (todos) {
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		});
	// 	} else {
	// 		console.log("No todo found...")
	// 	}
	// }).catch(function (e) {
	// 	console.log(e.message);
	// });
 });

