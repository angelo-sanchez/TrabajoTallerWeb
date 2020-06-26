const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientes');
const cotizationController = require('../controllers/cotizaciones');
const connect = require('../controllers/connection');
const Cliente = require('../models/Cliente');

const db = connect("Angelo", "angelo", "construcciones");
db.on('error', () => console.error("No se puede conectar a la base de datos"));
db.once('open', () => console.info("Conexion exitosa a la base de datos:  " + db.name));


//RUTAS PARA CLIENTES
router.get('/', clientController.readClientes);

router.get('/:cliente', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, has solicitado información del cliente con id ${req.params.cliente}`);
});
router.post('/', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, hemos recibido el cliente:<br>
	<pre>${JSON.stringify(req.body)}</pre>`);
	const { method, body } = req;
	console.log({ method, body });
});
router.put('/:cliente', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, hemos recibido la actualizacion para el cliente ${req.params.cliente}<br>
	<pre>${JSON.stringify(req.body)}</pre>`);
	const { method, body } = req;
	console.log({ method, body });
});
router.delete('/:cliente', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, has solicitado eliminar el cliente con id ${req.params.cliente}`);
});

//RUTAS PARA CLIENTE/COTIZACION
router.get('/:cliente/cotizaciones', (req, res, next) => {
	res.status(200).send('Hola desde ' + req.baseUrl);
});
router.get('/:cliente/cotizaciones/:cotizacion', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, has solicitado la cotizacion ${req.params.cotizacion},la cual pertenece al cliente ${req.params.cliente}`);
});
router.post('/:cliente/cotizaciones', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, hemos recibido la cotizacion:<br>
		<pre>${JSON.stringify(req.body)}</pre><br>
		para agregar al cliente ${req.params.cliente}`);
	const { method, body } = req;
	console.log({ method, body });
});
router.put('/:cliente/cotizaciones/:cotizacion', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, hemos recibido una actualizacion para la cotizacion ${req.params.cotizacion} del cliente ${req.params.cliente}<br>
		<pre>${JSON.stringify(req.body)}</pre>`);
	const { method, body } = req;
	console.log({ method, body });
});
router.delete('/:cliente/cotizaciones/:cotizacion', (req, res, next) => {
	res.status(200).send(`Hola desde ${req.baseUrl}, has solicitado eliminar la cotizacion con id ${req.params.cotizacion}, dirigida al cliente ${req.params.cliente}`);
});

module.exports = router;