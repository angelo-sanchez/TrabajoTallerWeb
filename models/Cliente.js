const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
	// _id es el CUIT del cliente
	_id: { type: Number, minlength: 10, maxlength: 11, match: /\d+/ },
	nombre: String,
	cotizaciones: [{
		fecha: Date,
		margen: { type: Number, min: 0, max: 1 },
		materiales: [{
			cantidad: Number,
			material: {
				tipo: String,
				udm: String,
				costo: Number
			}
		}]
	}]
});

const Cliente = mongoose.model('Cliente', clientSchema);
module.exports = Cliente;