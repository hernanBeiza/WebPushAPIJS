var pjson = require('../../package.json');

function mensaje(){
	return "API de Notificaciones ver " +pjson.version;
}

module.exports = {
	mensaje: mensaje,
};