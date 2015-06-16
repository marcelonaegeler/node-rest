module.exports = function() {
	var express = require('express')
		, router = express.Router()
		, fs = require('fs')
		;

	router.get('/', function(req, res) {
        var collection = req.db.get('users');
        fs.readFile(__dirname +'/../public/index.html', 'utf-8', function(err, text) {
			res.send(text);
		});        
	});

	router.get('/users', function(req, res) {
		var collection = req.db.get('users');

		collection.find({}, {}, function(err, docs) {
			if(err) throw err;
			res.json(docs);
		});
	});

	router.get('/user/?:id?', function(req, res) {
		var collection = req.db.get('users');
		var id = req.params.id;
		collection.findById(id, {}, function(err, doc) {
			if(err) throw err;
			
			res.json(doc);
		});
		
	});

	router.put('/user', function(req, res) {
		var collection = req.db.get('users');

		var user = {
			name: req.body.name
			, email: req.body.email
			, username: req.body.username
		};

		if(req.body._id) {
			collection.findAndModify({ _id: req.body._id }, user, function(err, doc) {
				if(err) throw err;
				res.json(doc);
			});

			return;
		}
		collection.insert(user, function(err, doc) {
			if(err) throw err;
			res.json(doc);
		});
	});

	router.delete('/user/:id', function(req, res) {
		var collection = req.db.get('users');
		collection.remove({ _id: req.params.id }, function(err, docs) {
			if(err) throw err;
			res.json(docs);
		});
		return;
	});

	return router;
};
