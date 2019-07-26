const { red, blue, yellow, cyan, green } = require("colorette")

const SubscriptorDAO = require("./../daos/SubscriptorDAO");

function registrar(req,res) {
	console.log(cyan("SubscriptorController: registrar();"));

	console.log(req.body);
	
	var enviar = true;
	var errores = "Te faltó:";
	

	if(enviar){

		var model = req.body;

		SubscriptorDAO.registrar(model,function(result,mensajes){

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

	} else {
	
		res.json({
			result:false,
			errores:errores
		});

	}

	/*
	const multiparty = require ('multiparty');
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {

    	if(err){

	    	console.error(red(err));

			res.json({result:2,errores:err});

    	} else {

	    	console.log(fields);

	    	if(fields){

				var endpoint = fields.endpoint[0];

				if(endpoint == undefined){
					resut = false;
					errores+="\n endpoint";
				}

				if(enviar){

					var model = {endpoint:endpoint};

					SubscriptorDAO.registrar(model,function(result,mensajes){

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

				} else {
				
					res.json({
						result:false,
						errores:errores
					});

				}

	    	} else {

				res.json({
					result:false,
					errores:errores
				});

	    	}

    	}

    });
    */
}

function desregistrar(req,res) {
	console.log(cyan("SubscriptorController: desregistrar();"));

	res.json({
		result:true,
		mensajes:"Te has desregistrado de las notificaciones"
	});
}


function obtener(req,res) {
	console.log(cyan("SubscriptorController: obtener();"));
	
	SubscriptorDAO.obtener(function(result,mensajes,subscriptores){

		console.log(result,mensajes,subscriptores);

		if(result){
			var respuesta = {
				result:result,
				mensajes:mensajes,
				subscriptores:subscriptores
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
	registrar:registrar,
	desregistrar:desregistrar,
	obtener:obtener
};
