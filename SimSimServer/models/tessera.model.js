var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TesseraSchema = new Schema (
{
	socio: { type: Schema.Types.ObjectId, ref: 'Socio', required: true },
	numero_tessera: { type: String, required: true, unique: true },
	seriale: { type: String, required: true, uppercase: true, unique: true, trim: true },
	stato: { type: String, enum: ['ATTIVATA', 'attivata', 'DISATTIVATA', 'disattivata'], uppercase: true, trim: true, required: true },
	rilasciato:  { type: Date, required: true },
	ultimo_rinnovo: { type: Date, required: true }
});

// export function to create "Tessera" model class
module.exports = mongoose.model("Tessera", TesseraSchema);
