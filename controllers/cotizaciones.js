const Cliente = require('../models/Cliente');

module.exports = {
	createCotization: (req, res) => {
		const client = req.params.cliente;
		const materiales = JSON.parse(req.body.materiales);
		const margen = +req.body.margen,
			fecha = new Date(),
			cotizacion = { margen, fecha, materiales };
		Cliente.findByIdAndUpdate(client, {
			$push: { cotizaciones: cotizacion }
		}, (err, updated) => {
			if (err) return res.status(500)
				.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
			return res.status(200)
				.json({
					msg: `Cotizacion agregada correctamente al cliente ${client}`,
					cotizacion
				});
		})
	},

	//READ ALL
	readCotizations: (req, res) => {
		const client = req.params.cliente;
		Cliente.findById(client, { cotizaciones: 1 }, (err, client) => {
			if (err) return res.status(500)
				.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
			return res.status(200).json(client.cotizaciones);
		});
	},

	//READ BY ID
	readCotization: (req, res) => {
		const client = req.params.cliente,
			cotId = req.params.cotizacion;
		Cliente.findOne({ _id: client, "cotizaciones._id": cotId }, { "cotizaciones.$.": 1 }, (err, client) => {
			if (err) return res.status(500)
				.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
			return res.status(200).json(client.cotizaciones);
		});
	}

	//UPDATE BY ID

	//DELETE BY ID

}