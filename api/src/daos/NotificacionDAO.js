const { red, blue, yellow, cyan, green } = require("colorette");

const mongoose = require('mongoose');

const webPush = require('web-push');

const q = require('q');

const keys = require("./../config/keys");

const NotificacionSchema = require('./../models/NotificacionSchema');
const SubscriptorSchema = require('./../models/SubscriptorSchema');

//const SubscriptorSchema = mongoose.model('Subscriptor');
//var db = require('./../daos/DBDAO');
//const SubscriptorSchema = mongoose.model('subscriptor');

function guardar(notificacion,callbackGuardar){
    console.log(cyan("NotificacionDAO: guardar();"));
    console.log(notificacion);

}

function enviar(notificacion,callbackEnviar){
	console.log(cyan("NotificacionDAO: enviar();"));

  const payload = {
    title: notificacion.titulo,
    message: notificacion.mensaje,
    url: notificacion.url,
    ttl: 36000,
    icon: notificacion.icono,
    image: notificacion.imagen
  };

  console.log(payload);

  SubscriptorSchema.find({}).find(function(err,subscriptores){

    if(err){

      console.error(err);
      callbackEnviar(false,err);

    } else {

      let parallelSubscriptionCalls = subscriptores.map((subscripcion) => {

        return new Promise((resolve, reject) => {

          const pushSubscription = {
            endpoint: subscripcion.endpoint,
            keys: {
              p256dh: subscripcion.keys.p256dh,
              auth: subscripcion.keys.auth
            }
          };

          const pushPayload = JSON.stringify(payload);

          const pushOptions = {
            vapidDetails: {
              subject: "http://localhost:4200/",
              privateKey: keys.privateKey,
              publicKey: keys.publicKey
            },
            TTL: payload.ttl,
            headers: {}
          };

          webPush.sendNotification(pushSubscription, pushPayload, pushOptions).then((value) => {

            console.log(value);

            resolve({ status: true, endpoint: subscripcion.endpoint, data: value });

          }).catch((err) => {

            console.error(err);
              
            reject({ status: false, endpoint: subscripcion.endpoint, data: err });

          });

        });


      });

      q.allSettled(parallelSubscriptionCalls).then((pushResults) => {

        console.log("Reultado de envío de notificaciones");

        console.info(pushResults);

        callbackEnviar(true,"Notificaciones enviadas correctamente");

      });

    }   

  });

}

module.exports = {
	enviar: enviar
};