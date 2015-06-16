var express = require('express')
	, app = express()
	, bodyParser = require('body-parser')
	, mongodb = require('mongodb')
	, db = require('monk')('localhost:27017/node-rest')
	;

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next){
    req.db = db;
    next();
});

var index = require('./routes/index.js')(); 

app.use('/', index);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens on port '+ port);