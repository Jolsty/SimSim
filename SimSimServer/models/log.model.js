var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema (
{
	tipo: { type: String, enum: ["telecomando", "tessera", "keypad"], required: true, lowercase: true, trim: true },
	seriale: { type: String, default: "N/A", uppercase: true, trim: true },
	nome: { type: String, default: "N/A", lowercase: true, trim: true },
	cognome:  { type: String, default: "N/A", lowercase: true, trim: true },
	numero_tessera: { type: String, default: ""},
	data: { type: Date, required: true }
});

LogSchema.index( { '$**': 'text'});

// export function to create "Log" model class
module.exports = mongoose.model("Log", LogSchema);
