/**
 * Objeto de la DB, esquema
 */

var mongoose = require('mongoose');

var db = require('./../daos/DBDAO');

var Schema = mongoose.Schema;

var NotificacionSchema = new Schema({
    titulo: String,
   	mensaje: String,
   	icono: String,
   	url: String,
   	imagen: String,
});

//module.exports = mongoose.model('Notificacion', NotificacionSchema,'notificacion');
module.exports = db.model('Notificacion', NotificacionSchema,'notificacion');