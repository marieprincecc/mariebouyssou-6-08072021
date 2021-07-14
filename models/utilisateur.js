const mongoose = require('mongoose')        //importation mongoose
const uniqueValidator = require('mongoose-unique-validator');

const schemaUtilisateur = mongoose.Schema({     //modele user
   // userId: {type: string, required: true}, //identifiant unique MongoDB pour l'utilisateur qui a créé la sauce 
    email: {type: String, required: true, unique: true},  //adresse électronique de l'utilisateur [unique] 
    password: {type: String, required: true} // hachage du mot de passe de l'utilisateur

})

schemaUtilisateur.plugin(uniqueValidator);
module.exports = mongoose.model('user', schemaUtilisateur);      //exportation modele