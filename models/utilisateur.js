const mongoose = require('mongoose')        //importation mongoose
const uniqueValidator = require('mongoose-unique-validator');   //pour les entrées uniques

const regexMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ 
const regexPassword = /^[a-zA-Z0-9]+[^\s'$=]{8,20}$/

const schemaUtilisateur = mongoose.Schema({     //modele user
   // userId: {type: string, required: true}, //identifiant unique MongoDB pour l'utilisateur qui a créé la sauce 
    email: {                                            //adresse électronique de l'utilisateur unique et verifier 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
              return regexMail.test(v);
            },
            message: '{VALUE} is not a mail!'
          },
          },  
    password: {                                                 //mot de passe de l'utilisateur
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return regexPassword.test(v);
              },
              message: '{VALUE} non conforme'
        }
    } 

})

schemaUtilisateur.plugin(uniqueValidator); //application du plugin
module.exports = mongoose.model('user', schemaUtilisateur);      //exportation modele