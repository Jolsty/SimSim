var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocioSchema = new Schema (
{
	nome: { type: String, required: true, lowercase: true, trim: true },
	cognome:  { type: String, required: true, lowercase: true, trim: true },
	numero_tessera: { type: Number, required: true, unique: true, min: 1 },
	sesso: { type: String, enum: ['M', 'F', 'm', 'f'], required: true, uppercase: true },
	nascita: { type: Date, required: true },
	ruolo: { type: String, default: "N/A", lowercase: true, trim: true },
	email: { type: String, default: "N/A", required: true, unique: true, lowercase: true, trim: true },
	nazionalita: { type: String, default: "N/A", lowercase: true, trim: true},
	indirizzo:
	{
		regione: { type: String, default: "N/A", lowercase: true, trim: true },
		provincia: { type: String, default: "N/A", uppercase: true, trim: true },
		citta: { type: String, default: "N/A", lowercase: true, trim: true },
		cap: { type: String, default: "N/A", trim: true},
		via: { type: String, default: "N/A", lowercase: true, trim: true },
		civico: { type: String, default: "N/A", uppercase: true, trim: true }
	},
	telefoni:
	{
		telefono1: { type: String, default: "N/A", uppercase: true, trim: true },
		telefono2: { type: String, default: "N/A", uppercase: true, trim: true }
	},
	professione: { type: String, default: "N/A", lowercase: true, trim: true },
	interessi:
	{
		interesse1: { type: String, default: "N/A", lowercase: true, trim: true },
		interesse2: { type: String, default: "N/A", lowercase: true, trim: true }
	},
	note: { type: String, default: null, lowercase: true, trim: true },
	prima_iscrizione: { type: Date, default: Date.now },
	ultimo_rinnovo_iscrizione: { type: Date, default: Date.now },
});

// export function to create "Socio" model class
module.exports = mongoose.model("Socio", SocioSchema);
