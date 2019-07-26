const { red, blue, yellow, cyan, green } = require("colorette")

var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

const IndexController = require ("./controllers/IndexController");
const SubscriptorController = require ("./controllers/SubscriptorController");
const NotificacionController = require ("./controllers/NotificacionController");

const configServer = require('./config/config.json')[process.env.NODE_ENV];

module.exports = function(app){

	var apiRoutes = express.Router();
	
	app.use(cors());
	
	/*
	app.use(cors({
       origin: configServer.permiso,
       credentials: true
    }));
    */
	
	app.use(cookieParser());

	//Session
	/*
	app.use(session({
	    secret: configServer.secret,
	    resave: true,
	    saveUninitialized: true,
	    //cookie: { secure: false, httpOnly: false }
	}));
	*/

	app.all('/', function(req, res, next) {
		//res.header('Access-Control-Allow-Origin', '*');		
		//res.header('Access-Control-Allow-Credentials', true);		
		res.header('Access-Control-Allow-Origin', configServer.permiso);		

		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});
	
	app.all('/*', function(req, res, next) {
		//res.header('Access-Control-Allow-Origin', '*');
		//res.header('Access-Control-Allow-Credentials', true);		
		res.header('Access-Control-Allow-Origin', configServer.permiso);		

		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		//res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
		/*
		res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		*/
		next();
	});	
	

	// Token
	// route middleware to verify a token
	apiRoutes.use(function(req, res, next) {
		// console.green.log("routes.js: token middleware");
		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['token'];
		// console.log("routes.js: token: " + token);
		// decode token
		if (token) {
			// verifies secret and checks exp
			jwt.verify(token, config.secret, function(err, decoded) {      
				if (err) {
					return res.json({ result: false, mensaje: 'Error al autentificar el token.' });    
				} else {
					// if everything is good, save to request for use in other routes
					req.decoded = decoded;    
					next();
				}
			});
		} else {
		  // if there is no token
		  // return an error
		  return res.status(403).send({ 
			  result: false, 
			  error: 'No enviaste el token.' 
		  });
		}	
	});
		
	// API Rutas
	// index
	app.get("/",IndexController.saludar);
	// Subscriptores
	app.get("/subscriptor",SubscriptorController.obtener);
	app.post("/subscriptor",SubscriptorController.registrar);
	app.delete("/subscriptor/:idsubscriptor",SubscriptorController.desregistrar);
	// api
	//app.use('/api', apiRoutes);
	// Subscriptores
	//app.get("/api/subscriptor",SubscriptorController.obtener);
	// Notificaciones
	//app.get("/api/notificacion",NotificacionController.enviar);
	app.post("/notificacion",NotificacionController.guardar);
	app.post("/notificacion/enviar",NotificacionController.enviar);
}