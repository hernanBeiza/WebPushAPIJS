/**
 * Objeto de la DB, esquema
 */

var mongoose = require('mongoose');

var db = require('./../daos/DBDAO');

var Schema = mongoose.Schema;

var SubscriptorSchema = new Schema({
    endpoint: String,
	keys: Schema.Types.Mixed,
	createDate: {
       type: Date,
       default: Date.now
	}
});

//module.exports = mongoose.model('subscriptor', SubscriptorSchema,'subscriptor');
module.exports = db.model('Subscriptor', SubscriptorSchema,'subscriptor');