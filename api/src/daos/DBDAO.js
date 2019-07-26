const { red, blue, yellow, cyan, green } = require("colorette");

var mongoose = require('mongoose');

// Obtiene la configuración según el NODE_ENV o environment seteado en el script NPM
const config = require('./../config/'+[process.env.NODE_ENV]+'.json')[process.env.NODE_ENV];
console.log(config);
console.log(yellow(config.host+config.db));
/*
let options = { 
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
}; 
*/
//DB connection
db = mongoose.createConnection(config.host+config.db,{ useNewUrlParser: true });

db.on('error', function(err){
	if(err) {
		console.error(err);
		throw err;
	}
});

db.once('open', function callback () {
	console.info(yellow('Mongo db connected successfully'));
});

module.exports = db;