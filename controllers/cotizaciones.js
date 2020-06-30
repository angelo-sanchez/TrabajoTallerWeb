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
	}

	//READ ALL

	//READ BY ID

	//UPDATE BY ID

	//DELETE BY ID

}