const { red, blue, yellow, cyan, green } = require("colorette")

const NotificacionDAO = require("./../daos/NotificacionDAO");

function guardar(req,res) {
	console.log(cyan("NotificacionController: guardar();"));
	console.log(req.body);

	res.json({mensajes:"Prueba"});

}

function enviar(req,res) {
	console.log(cyan("NotificacionController: enviar();"));
	
	//TODO
	let model = {
		titulo: "Prueba",
		mensaje: "Mensaje de prueba",
		icono: "assets/img/notificacion/notificacion.ico",
		imagen: "assets/img/notificacion/notificacion.ico",
		url: "https://www.policenter.cl",
	}

	NotificacionDAO.enviar(model,function(result,mensajes){

		console.log(cyan("NotificacionController: enviar();"));

		console.log(result,mensajes);

		if(result){
			var respuesta = {
				result:result,
				mensajes:mensajes
			}
		} else {
			var respuesta = {
				result:result,
				errores:mensajes
			}
		}

		res.json(respuesta);

	});


}

module.exports = {
	guardar:guardar,
	enviar:enviar
};
