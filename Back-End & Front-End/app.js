// Modules

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
require('./helpers/cron-scheduler');

// Express app

var app = express();

// Body-parser

app.use(bodyParser.json()); // for parsing json
app.use(bodyParser.urlencoded( { extended: true } )); // for parsing url encoded data
app.use(bodyParser.text()); // for parsing raw text (data from arduino)

// Routes

require('./routes/index.routes.js')(app);
require('./routes/logs.routes.js')(app);
require('./routes/soci.routes.js')(app);
require('./routes/tessere.routes.js')(app);

// View engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database

var options =
{
	useNewUrlParser: true,
	useCreateIndex: true,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE, // continua a riconnetterti
	reconnectInterval: 5000 // reconnect ogni 5 sec
};
mongoose.connect('mongodb://localhost/test', options, (err) => {
	if (err) {
		console.error("Connessione a MongoDB fallita. Il database è down.");
		process.exit();
	} else console.log("Connesso a MongoDB in locale");
});

let db = mongoose.connection;

db.on('disconnected', function () {
	console.log("Disconnesso da MongoDB. Riavvia il database.");
});

db.on('reconnecting', function () {
	console.log("Sto cercando di riconnettermi a MongoDB...")
})

db.on('reconnected', function () {
	console.log("Riconnesso a MongoDB");
})

// Loggerrs

app.use(logger('dev')); // for development

// Path

app.use(express.static(path.join(__dirname, 'public')));

// Catch 404 and forward to error handler

app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

// Error handler

app.use(function(err, req, res, next) {
  	// set locals, only providing error in development
  	res.locals.message = err.message;
  	res.locals.error = req.app.get('env') === 'development' ? err : {}; // Express app.get('env') returns 'development' if NODE_ENV is not defined.

  	// render the error page
  	if (err.status === 404) res.render('404');
  	else { // other types of errors
	  	res.status(err.status || 500);
	  	res.render('error');
  	}
});

// Server

//const addr = "192.168.1.16"; // bisogna essere assegnato come IP statico sul raspberry
const port = 3000;

var server = app.listen(port, () => {
	console.log("Server listening on port " + server.address().port);
});

/*var server = app.listen(port, addr, () => {
	console.log("Server listening on " + server.address().address + ":" + server.address().port);
});*/
