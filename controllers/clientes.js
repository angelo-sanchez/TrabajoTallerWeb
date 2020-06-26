const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');

const createClient = (req, res, next) => {
	const client = new Cliente({ _id: req.body.cuit, nombre: req.body.nombre });
	client.save({ validateBeforeSave: true }, (err, inserted) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
		if (!inserted) return res.status(500)
			.json({ msg: `No se puede guardar el cliente` });
		res.status(200).json(inserted);
	});
}
const readClientes = (req, res, next) => {
	//readClients
	Cliente.find((err, clients) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
		if (!(clients && clients.length)) return res.status(404)
			.json({ msg: `No se encontraron clientes en la base de datos` });

		res.status(200).json(clients);
	})
}
const readClient = (req, res, next) => {
	Cliente.findById(req.params.cliente, (err, client) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` });
		if (!(client)) return res.status(404)
			.json({ msg: `No se encontró al cliente en la base de datos` });
		res.status(200).json(client);
	})
}
const updateClient = (req, res, next) => {
	Cliente.findByIdAndUpdate(req.params.cliente, req.body, { new: true }, (err, client) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` })
		res.status(200).json(client);
	})
}
const deleteClient = (req, res, next) => {
	Cliente.deleteOne({ _id: req.params.cliente }, (err) => {
		if (err) return res.status(500)
			.json({ msg: `Ocurrió un error en la base de datos: ${err}` })
		res.status(200).json({ msg: `Eliminaste el cliente ${req.params.cliente} y toda la información relacionada` });
	})
}

module.exports = {
	createClient,
	readClientes,
	readClient,
	updateClient,
	deleteClient
};