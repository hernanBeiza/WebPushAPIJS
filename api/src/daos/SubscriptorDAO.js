const { red, blue, yellow, cyan, green } = require("colorette");

const mongoose = require('mongoose');

const SubscriptorSchema = require('./../models/SubscriptorSchema');

//const SubscriptorSchema = mongoose.model('Subscriptor');
//var db = require('./../daos/DBDAO');
//const SubscriptorSchema = mongoose.model('subscriptor');

function registrar(model,callbackGuardar){
	console.log(cyan("SubscriptorDAO: registrar();"));
    console.log(model);

    SubscriptorSchema.findOneAndUpdate({ endpoint:model.endpoint }, { $set: { endpoint: model.endpoint } }, { useFindAndModify:true, new: true, upsert: true }, 
        
        function(error,subscriptor){

            console.log(error);
            console.log(subscriptor);

            if (error){ 
                console.error(red("Subscriptor no guardado. Error " + error));
                callbackGuardar(false,"Subscriptor no guardado");
            } else {
                if(subscriptor){
                    console.log("Subscriptor actualizado");
                    callbackGuardar(true,"Subscritor actualizado correctamente");

                } else {
                    console.log("Subscriptor guardado");
                    callbackGuardar(true,"Subscritor guardado correctamente");
                }
            }
        }

    );

    /*
    var subscritorGuardable = new SubscriptorSchema(model);
    console.log(subscritorGuardable);


    subscritorGuardable.save(function(err, SubscriptorSchema) {
        console.error(err);
        if (err){ 
            console.error(red("Subscriptor no guardado. Error " + err));
            callbackGuardar(false,"Subscriptor no guardado");
        } else {
            //callbackGuardar(true,SubscriptorSchema.id);
            console.log("Subscriptor guardado");
            callbackGuardar(true,"Subscritor guardado correctamente");
        }
    });
    */

}

function actualizar(model,callbackActualizar){
    console.log(cyan("SubscriptorDAO: actualizar();"));
    console.log(model);

    SubscriptorSchema.findOneAndUpdate({ endpoint: model.endpoint }, { $set: { endpoint: model.endpoint } }, { useFindAndModify:true, new: true }, 

        function(error, subscriptor) {

            console.log(error);
            console.log(subscriptor);

        }

    );

}

function desregistrar(model,callbackEliminar){
    console.log(cyan("SubscriptorDAO: desregistrar();"));
    console.log(model);

    var subscritorGuardable = new SubscriptorSchema({nombre:model.nombre});
    console.log(subscritorGuardable);

    subscritorGuardable.drop({ _id: req.body.id}, function(err) {
        if (err){ 
            console.error(err);
            console.error(red("Subscriptor no eliminado. Error " + err));
            callbackEliminar(false,"Subscriptor no eliminado");
        } else {
            console.log("Subscriptor eliminado");
            callbackEliminar(true,"Subscriptor eliminado correctamente");
        }
    });

}

function obtener(callbackObtener){
    console.log(cyan("SubscriptorDAO: obtener();"));

    SubscriptorSchema.find({},function(err, subscriptores) {
        if (err){ 
            console.error(red("No se pudo obtener los subscriptores. Error " + err));
            callbackObtener(false,"No se pudo obtener los subscriptores",null);
        } else {
            console.log("Subscriptores encontrados");
            console.log(subscriptores);
            //callbackObtener(true,SubscriptorSchema.id);
            callbackObtener(true,"Subscriptores encontrados correctamente",subscriptores);
        }
    });
}



module.exports = {
	registrar: registrar,
    desregistrar: desregistrar,
    obtener:obtener
};