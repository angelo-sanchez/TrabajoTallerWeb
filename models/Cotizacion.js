const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CotizacionSchema = new Schema({
	cliente: {
		nombre: String,
		cuit: { type: Number, minlength: 9, maxlength: 11 }
	},
	fecha: { type: Date, default: Date.now() },
	margen: { type: Number, default: 0 },
	materiales: [{
		cant: Number,
		material: {
			tipo: String,
			costo: Number,
			udm: String
		}
	}]
});

const Cotizacion = mongoose.model('Cotizacion', CotizacionSchema);
module.exports = Cotizacion;