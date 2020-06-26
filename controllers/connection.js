const mongoose = require('mongoose');
/**
 * Establece la conexion con una base de datos dada, usando mongoose
 * @param {string} user Nombre de usuario de la base de datos
 * @param {string} password Contraseña
 * @param {string} dbname Nombre de la base de datos
 * @returns {mongoose.Connection} un objeto que representa la conexion a la base de datos.
 */
const connect = (user, password, dbname) => {
	mongoose.connect(`mongodb://localhost:27017`, {
		auth: {
			password,
			user
		},
		authSource: dbname,
		dbName: dbname,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, err => {
		err ? console.error(err.message) : console.info("Connection success");
	});
	return mongoose.connection;
}

module.exports = connect;