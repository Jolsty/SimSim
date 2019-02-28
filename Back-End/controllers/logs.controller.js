// Models

var Log = require('../models/log.model.js');
var Tessera = require('../models/tessera.model.js');
var DateFunctions = require('../helpers/date.functions.js');

// Functions

exports.viewAllLogs = (req, res) => {
	Log.find( (err, logs) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal Server Error: Log.find ha rilevato un errore");
		}
		else return res.render("../views/logs/logs_index", { logs: logs });
	});
}

exports.viewLogsByNumeroTessera = (req, res) => {
	Log.find( { numero_tessera: req.params.numeroTessera }, (err, logs) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal Server Error: Log.find ha rilevato un errore");
		}
		else return res.render("../views/logs/logs_index", { numero_tessera: req.params.numeroTessera, logs: logs });
	});
};

exports.viewLogsByNomeCognome = (req, res) => {
	Log.find( { nome: req.params.nome, cognome: req.params.cognome }, (err, logs) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal Server Error: Log.find ha rilevato un errore");
		}
		else return res.render("../views/logs/logs_index", { nome: req.params.nome, cognome: req.params.cognome, logs: logs });
	});
};

exports.viewLogsByDate = (req, res) => {
	var date = req.params.data.split("-");
	var year, month, day;
	var now = new Date();

	switch (date.length) {

		case 1:

			year = new Number(date[0]);
			month = null;
			day = null;
			if ( year < 1970 || year > now.getFullYear() ) return res.status(400).send("Bad Request: l'anno non può essere minore di 1970 o maggiore di " + now.getFullYear());
			Log.find( { data: { "$gte": new Date(year, 0, 1, 0, 0, 0), "$lte": new Date(year, 11, 31, 23, 59, 59) } }, (err, logs) => {
				if (err) console.error(err);
				else return res.render("../views/logs/logs_index", { data: req.params.data, logs: logs });
			});
			break;

		case 2:

			year = new Number(date[0]);
			month = new Number(date[1])-1;
			day = null;
			if ( year < 1970 || year > now.getFullYear() ) return res.status(400).send("Bad Request: l'anno non può essere minore di 1970 o maggiore di " + now.getFullYear());
			if ( month < 0 || month > 11 ) return res.status(400).send("Bad Request: il mese deve essere compreso nell'intervallo [1, 12]");
			Log.find( { data: { "$gte": new Date(year, month, 1, 0, 0, 0), "$lte": new Date(year, month, DateFunctions.getDaysInMonth(year, month), 23, 59, 59) } }, (err, logs) => {
				if (err) console.error(err);
				else return res.render("../views/logs/logs_index", { data: req.params.data, logs: logs });
			});
			break;

		case 3:

			year = new Number(date[0]);
			month = new Number(date[1])-1;
			day = new Number(date[2]);
			if ( year < 1970 || year > now.getFullYear() ) return res.status(400).send("Bad Request: l'anno non può essere minore di 1970 o maggiore di " + now.getFullYear());
			if ( month < 0 || month > 11 ) return res.status(400).send("Bad Request: il mese deve essere compreso nell'intervallo [1, 12]");
			if ( day < 1 || day > 31 ) return res.status(400).send("Bad Request: il giorno deve essere compreso nell'intervallo [1, 31]");
			Log.find ( { data: { "$gte": new Date(year, month, day, 0, 0, 0), "$lte": new Date(year, month, day, 23, 59, 59) } }, (err, logs) => {
				if (err) console.error(err);
				else return res.render("../views/logs/logs_index", { data: req.params.data, logs: logs });
			});
			break;

		default:

			return res.status(400).send("Bad Request: data non valida");

	}
};

exports.viewLogsByTipo = (req, res) => {
	Log.find( { tipo: req.params.tipo }, (err, logs) => {
		if (err) console.error(err);
		else res.render("../views/logs/logs_index", { tipo: req.params.tipo, logs: logs });
	});
};

exports.addLog = (req, res) => {
	if (!req) return res.status(400).send("Bad Request: manca il body della request");
	console.log("Received log add from Arduino: " + req.body);
	try {
		var body = JSON.parse(req.body);

		if (!body.data || !body.tipo) return res.status(400).send("Bad Request: manca qualche campo obbligatorio");

		var date = new Date(body.data);
		//date.setHours(date.getHours() - 1); // fuso orario corretto; era sfasato di 1 ora

		if (body.tipo === "tessera") {

			if (!body.seriale) return res.status(400).send("Bad Request: manca il campo seriale per il log con tipo = tessera");

			Tessera.
				findOne( { seriale: body.seriale } ).
				populate('socio').
				exec( (err, tessera) => {
					if (err) return console.error(err);
					if (tessera) {
						let log = new Log (
						{
							nome: tessera.socio.nome,
							cognome: tessera.socio.cognome,
							numero_tessera: tessera.numero_tessera,
							seriale: tessera.seriale,
							data: date,
							tipo: body.tipo
						});

						log.save( (err) => {
							if (err) {
								console.error(err);
								return res.status(500).send("Internal Server Error: il log non è stato aggiunto. Probabilmente perchè alcuni dati inseriti sono scorretti.");
							} else {
								console.log("Log aggiunto via API");
								return res.status(200).send("OK: log aggiunto");
							}
						});
					} else return res.status(404).send("Not Found: non trovo tessera con seriale " + body.seriale);
				});
		} else {
			let log = new Log (
			{
				data: new Date(body.data),
				tipo: body.tipo
			});

			log.save( (err) => {
				if (err) {
					console.error(err);
					return res.status(500).send("Internal Server Error: il log non è stato aggiunto. Probabilmente perchè alcuni dati inseriti sono scorretti.");
				} else {
					console.log("Log aggiunto via API");
					return res.status(200).send("OK: log aggiunto");
				}
			});
		}
	} catch (err) { // syntax error
		console.error(err);
		return res.status(400).send("Bad Request: il body deve essere in formato JSON")
	}
}
