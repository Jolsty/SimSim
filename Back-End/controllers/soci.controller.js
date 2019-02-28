// Models

var Socio = require('../models/socio.model.js');
var Tessera = require('../models/tessera.model.js');

// Functions

exports.viewAllSoci = (req, res) => {

	Socio.find( (err, soci) => {
		if (err) {
			console.error(err);
			return res.status(500).send("Internal Server Error: Socio.find ha rilevato un errore");
		} else return res.render("../views/soci/soci_index", { soci: soci });
	});
};

exports.viewSocioById = (req, res) => {

	Socio.
		findOne( { _id: req.params.id } ).
		exec( (err, socio) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.find ha rilevato un errore");
			} else return res.render("../views/soci/soci_viewOne", { socio: socio });
		});
};

exports.viewSocioByNumeroTessera = (req, res) => {

	if (isNaN(parseInt(req.params.numeroTessera))) return res.send("Il parametro 'numero tessera' deve essere un numero");

	Socio.
		findOne( { numero_tessera: req.params.numeroTessera } ).
		exec( (err, socio) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			}
			if (socio) return res.render("../views/soci/soci_viewOne", { socio: socio });
			else return res.send("Non esiste un socio con quel numero tessera");
		});
};

exports.viewSociByNomeCognome = (req, res) => {

	Socio.
		find( { nome: req.params.nome, cognome: req.params.cognome } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else return res.render("../views/soci/soci_index", { nome: req.params.nome, cognome: req.params.cognome, soci: soci });
		});
};

exports.viewSociByRuolo = (req, res) => {

	Socio.
		find( { ruolo: req.params.ruolo } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else return res.render("../views/soci/soci_index", { ruolo: req.params.ruolo, soci: soci });
		});
};

exports.viewSociByProvincia = (req, res) => {
	Socio.
		find( { "indirizzo.provincia": req.params.provincia } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else {
			 	return res.render("../views/soci/soci_index", { provincia: req.params.provincia, soci: soci });
			}
		});
}

exports.viewSociByRegione = (req, res) => {
	Socio.
		find( { "indirizzo.regione": req.params.regione } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else {
			 	return res.render("../views/soci/soci_index", { regione: req.params.regione, soci: soci });
			}
		});
}

exports.viewSociByCitta = (req, res) => {
	Socio.
		find( { "indirizzo.citta": req.params.citta } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else {
			 	return res.render("../views/soci/soci_index", { citta: req.params.citta, soci: soci });
			}
		});
}

exports.viewSociBySesso = (req, res) => {

	Socio.
		find( { sesso: req.params.sesso } ).
		exec( (err, soci) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else return res.render("../views/soci/soci_index", { sesso: req.params.sesso, soci: soci });
		});
}

exports.createSocio = (req, res) => {
    return res.render("../views/soci/soci_create");
};

exports.updateSocio = (req, res) => {

	Socio.
		findOne( { _id: req.params.id } ).
		exec( (err, socio) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.find ha rilevato un errore");
			} else return res.render("../views/soci/soci_update", { socio: socio });
		});
};

exports.addSocio = (req, res) => {

  	try {
  		var body = JSON.parse(req.body);
		if ( !body.nome || !body.cognome || !body.sesso || !body.numero_tessera || !body.nascita || !body.email ) return res.status(400).send("Bad Request: manca qualche campo obbligatorio");

		let socio = new Socio (
		{
			nome: body.nome,
			cognome: body.cognome,
			sesso: body.sesso,
			numero_tessera: body.numero_tessera,
			nascita: new Date(body.nascita),
			email: body.email,
			ruolo: body.ruolo,
			nazionalita: body.nazionalita,
			indirizzo:
			{
				regione: body.indirizzo.regione,
				provincia: body.indirizzo.provincia,
				citta: body.indirizzo.citta,
				cap: body.indirizzo.cap,
				via: body.indirizzo.via,
				civico: body.indirizzo.civico
			},
			telefoni:
			{
				telefono1: body.telefoni.telefono1,
				telefono2: body.telefoni.telefono2
			},
			professione: body.professione,
			interessi:
			{
				interesse1: body.interessi.interesse1,
				interesse2: body.interessi.interesse2
			},
			note: body.note
		});

		if (body.prima_iscrizione !== "") socio.prima_iscrizione = new Date(body.prima_iscrizione);
		if (body.ultimo_rinnovo_iscrizione !== "") socio.ultimo_rinnovo_iscrizione = new Date(body.ultimo_rinnovo_iscrizione);

		socio.save( (err) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: il socio non è stato aggiunto. Potrebbe essere un duplicato (mail oppure numero_tessera) oppure manca qualche campo obbligatorio");
			} else {
				console.log("Socio aggiunto");
				return res.status(200).send("Socio aggiunto");
			}
		});
  	} catch (err) { // syntax error
  		console.error(err);
  		return res.status(400).send("Il body deve essere in formato JSON")
  	}
};

exports.updateById = (req,res) => {

	try {
		var body = JSON.parse(req.body);
		if ( !body.nome || !body.cognome || !body.sesso || !body.numero_tessera || !body.nascita || !body.email ) return res.status(400).send("Bad Request: manca qualche campo obbligatorio");

		Socio.findOne( { _id: req.params.id }, (err, socio) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOne ha rilevato un errore");
			} else {

				if (socio) {
					socio.nome = body.nome;
					socio.cognome = body.cognome;
					socio.sesso = body.sesso;
					socio.numero_tessera = body.numero_tessera;
					socio.nascita = new Date(body.nascita);
					socio.email = body.email;
					socio.nazionalita = body.nazionalita;
					socio.ruolo = body.ruolo;
					socio.indirizzo.regione = body.indirizzo.regione;
					socio.indirizzo.provincia = body.indirizzo.provincia;
					socio.indirizzo.citta = body.indirizzo.citta;
					socio.indirizzo.cap = body.indirizzo.cap;
					socio.indirizzo.via = body.indirizzo.via;
					socio.indirizzo.civico = body.indirizzo.civico;
					socio.telefoni.telefono1 = body.telefoni.telefono1;
					socio.telefoni.telefono2 = body.telefoni.telefono2;
					socio.professione = body.professione;
					socio.interessi.interesse1 = body.interessi.interesse1;
					socio.interessi.interesse2 = body.interessi.interesse2;
					socio.note = body.note;
					socio.prima_iscrizione = new Date(body.prima_iscrizione);
					socio.ultimo_rinnovo_iscrizione = new Date(body.ultimo_rinnovo_iscrizione);

					socio.save( (err) => {
						if (err) {
							console.error(err);
							return res.status(500).send("Operazione fallita: qualche dato potrebbe essere un duplicato");
						} else {

							Tessera.findOne( { numero_tessera: socio.numero_tessera }, (err, tessera) => {
								if (err) console.error(err);
								if (tessera) {
									tessera.ultimo_rinnovo = socio.ultimo_rinnovo_iscrizione;
									tessera.save( (err) => {
										if (err) console.error(err);
										else console.log("ultimo_rinnovo della tessera aggiornato")
									});
								}
							});
							console.log("Socio aggiornato");
							return res.status(200).send("Socio aggiornato");
						}
					});
				} else return res.status(500).send("Non ho trovato un socio con l'id fornito");
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send("Il body deve essere in formato JSON");
	}
};

exports.deleteSocio = (req, res) => {

    Socio.
		findOneAndDelete( { _id: req.params.id } ).
		exec( (err, socio) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Socio.findOneAndDelete ha rilevato un errore.");
			}
			else {
				Tessera.findOneAndDelete( { socio: socio._id }, (err, tessera) => {
					if (err) {
						console.error(err);
						return res.status(500).send("Internal Server Error: Tessera.findOneAndDelete ha rilevato un errore.");
					}
					if (tessera) {
						return res.status(200).send("Socio con numero tessera " + socio.numero_tessera + " rimosso dal database. E' stata disattivata anche la sua tessera con seriale " + tessera.seriale + ".");
					} else return res.status(200).send("Socio con numero tessera " + socio.numero_tessera + " rimosso dal database. Non ho trovato una tessera fisica associata da disattivare.");
				});
			}
		});
};
