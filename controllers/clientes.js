const mongoose = require('mongoose');
const Cotizacion = require('../models/Cotizacion');

const createClient = (req, res, next) => {
	//readClients
	Cliente.find((err, clients) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
		if (!(clients && clients.length)) return res.status(404)
			.json({ msg: `No se encontraron clientes en la base de datos` });

		res.status(200).json(clients);
	})
}
const readClientes = (req, res, next) => {

}
const readClient = (req, res, next) => {

}
const updateClient = (req, res, next) => {

}
const deleteClient = (req, res, next) => {

}

module.exports = {
	createClient,
	readClientes,
	readClient,
	updateClient,
	deleteClient
};