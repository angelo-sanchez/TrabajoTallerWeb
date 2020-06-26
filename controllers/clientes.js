const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');

const createClient = (req, res, next) => {
	const client = new Cliente({ _id: req.body.cuit, nombre: req.body.nombre });
	client.save({ validateBeforeSave: true }, (err, inserted) => {
		if (err || !inserted) return res.status(500).json({ msg: `No se puede guardar el cliente, error: ${err}` });
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