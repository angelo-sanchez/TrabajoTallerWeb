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
			if (!(client && client.cotizaciones && client.cotizaciones.length))
				return res.status(404).json({ msg: 'No existe la cotización que buscas' })
			return res.status(200).json(client.cotizaciones[0]);
		});
	},

	//UPDATE BY ID
	updateCotization: (req, res) => {
		const client = req.params.cliente,
			cotId = req.params.cotizacion,
			updateObj = parseUpdate(req.body);
		if (!updateObj) return res.status(400).json({ msg: "Ocurrió un error al procesar la petición" });
		Cliente.findByIdAndUpdate(client, {
			$set: updateObj
		}, {
			new: true,
			arrayFilters: [{ "cotizacion._id": cotId }]
		}, (err, doc) => {
			if (err) return res.status(500)
				.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
			return res.status(200).json(doc);
		})
	},

	//DELETE BY ID
	deleteCotization: (req, res) => {
		const client = req.params.cliente,
			cotId = req.params.cotizacion;
		Cliente.findByIdAndUpdate(
			client, { $pull: { cotizaciones: { _id: cotId } } },
			(err, doc) => {
				if (err) return res.status(500)
					.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
				return res.status(200).json({ msg: `Se eliminó la cotización ${cotId}` })
			}
		)
	}
}

const parseUpdate = (body) => {
	const upd = {};
	if (body.margen) {
		if (body.margen < 0 || body.margen > 1)
			return;
		upd["cotizaciones.$[cotizacion].margen"] = +body.margen;
	}
	if (body.fecha) {
		let fecha = new Date(body.fecha);
		if (isNaN(fecha))
			return;
		upd["cotizaciones.$[cotizacion].fecha"] = fecha;
	}
	try {
		if (body.materiales) {
			upd["cotizaciones.$[cotizacion].materiales"] = JSON.parse(body.materiales);
		}
	} catch (error) {
		return;
	}
	console.log(JSON.stringify(upd));
	return upd;
}