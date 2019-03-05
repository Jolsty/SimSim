// Models

var Tessera = require('../models/tessera.model.js');
var Socio = require('../models/socio.model.js');

// Functions

exports.viewAllTessere = (req, res) => {
    Tessera.find( (err, tessere) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error: Tessera.find ha rilevato un errore");
        }
        else return res.render("../views/tessere/tessere_index", { tessere: tessere });
	});
};

exports.createTessera = (req, res) => {
    res.render("../views/tessere/tessere_create");
};

exports.viewTesseraByNumeroTessera = (req, res) => {
    Tessera.findOne( { numero_tessera: req.params.numeroTessera }, (err, tessera) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error: Tessera.findOne ha rilevato un errore");
        }
        else return res.status(200).send(tessera);
    });
};

exports.checkTesseraBySeriale = (req, res) => {
    if (!req) return res.status(400).send("Bad Request: manca il body della request");
    console.log("Received tessera check from Arduino: " + req.body);
    try {
        var body = JSON.parse(req.body);

        if (!body.seriale) return res.status(400).send("Bad Request: manca il campo seriale");

        Tessera.findOne( { seriale: body.seriale }, (err, tessera) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error: Tessera findOne ha rilevato un errore");
            }
            if (tessera) {
                if (tessera.stato === "ATTIVATA" ) return res.sendStatus(200);
                else return res.sendStatus(401); // 401 unauthorized
            } else return res.sendStatus(404); // 404 not found
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send("Bad Request: il body deve essere in formato JSON")
    }
};

exports.addTessera = (req, res) => {
  	try {
  		var body = JSON.parse(req.body);

        if ( !body.numero_tessera || !body.seriale || !body.stato ) return res.status(400).send("Manca qualche campo obbligatorio");

        Socio.
            findOne( { numero_tessera: body.numero_tessera  } ).
            exec( (err, socio) => {
                if (err) console.error(err);
                if (!socio) {
                    return res.status(400).send("Il socio con numero tessera " + body.numero_tessera + " non esiste nel database. Operazione fallita.");
                }

                let tessera = new Tessera (
                {
                    socio: socio._id,
                    numero_tessera: socio.numero_tessera,
                    seriale: body.seriale,
                    stato: body.stato,
                    rilasciato: new Date(),
                    ultimo_rinnovo: socio.ultimo_rinnovo_iscrizione
                });

                tessera.save( (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("La tessera non è stata salvata. Potrebbe essere un duplicato");
                    } else {
                        console.log("Tessera aggiunta via API");
                        return res.status(200).send("La tessera è stata aggiunta con stato " + body.stato);
                    }
                });
		    });
  	} catch (err) { // syntax error
  		console.error(err);
  		return res.status(400).send("Bad Request: il body deve essere in formato JSON")
  	}
};

exports.updateTessera = (req, res) => {

    try {

		var body = JSON.parse(req.body);
        
		if ( !body.stato ) return res.status(400).send("Bad Request: manca qualche campo obbligatorio");

		Tessera.findOne( { _id: req.params.id }, (err, tessera) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Internal Server Error: Tessera.findOne ha rilevato un errore");
			} else {

				if (tessera) {
					tessera.stato = body.stato;
					tessera.save( (err) => {
						if (err) {
							console.error(err);
							return res.status(500).send("Operazione fallita: tessera non aggiornata");
						} else {
							console.log("Tessera aggiornata con il nuovo stato " + body.stato);
							return res.status(200).send("Tessera aggiornata con il nuovo stato " + body.stato);
						}
					});
				} else return res.status(500).send("Non ho trovato una tessera con l'id fornito");
			}
		});
	} catch (err) {
		console.error(err);
		return res.status(400).send("Il body deve essere in formato JSON");
	}
};

exports.deleteTessera = (req, res) => {
    Tessera.
		findOneAndDelete( { _id: req.params.id } ).
		exec( (err, tessera) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Errore interno: la tessera non è stata disattivata");
			}
			else return res.status(200).send("Tessera con il numero tessera " + tessera.numero_tessera + "  e seriale " + tessera.seriale + " rimossa dal database");
		});
};
