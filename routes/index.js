module.exports = function() {
	var express = require('express')
		, router = express.Router()
		, fs = require('fs')
		;

	router.get('/', function(req, res) {
        var collection = req.db.get('users');
        var user = {
            name: 'Marcelo A Naegeler'
            , email: 'marcelo.andre.naegeler@gmail.com'
            , username: 'marcelonaegeler'
        };
        /*
		collection.insert(user, function(err, docs) {
			if(err) throw err;
			res.json(docs);
		});
		*/
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

		console.log('PUT /user: ', req.body);
		res.json(req.body);
	});

	return router;
};
