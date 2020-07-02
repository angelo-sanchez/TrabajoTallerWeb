const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientes');
const cotizationController = require('../controllers/cotizaciones');

const connect = require('../controllers/connection');
const db = connect("Angelo", "angelo", "construcciones");
db.on('error', () => console.error("No se puede conectar a la base de datos"));
db.once('open', () => console.info("Conexion exitosa a la base de datos:  " + db.name));

//RUTAS PARA CLIENTES
router.get('/', clientController.readClientes);
router.get('/:cliente', clientController.readClient);
router.post('/', clientController.createClient);
router.put('/:cliente', clientController.updateClient);
router.delete('/:cliente', clientController.deleteClient);

//RUTAS PARA CLIENTE/COTIZACION
router.get('/:cliente/cotizaciones', cotizationController.readCotizations);
router.get('/:cliente/cotizaciones/:cotizacion', cotizationController.readCotization);
router.post('/:cliente/cotizaciones', cotizationController.createCotization);
router.put('/:cliente/cotizaciones/:cotizacion', cotizationController.updateCotization);
router.delete('/:cliente/cotizaciones/:cotizacion', cotizationController.deleteCotization);

module.exports = router;