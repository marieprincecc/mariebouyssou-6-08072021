const mongoose = require('mongoose')        //importation mongoose

const schemaUtilisateur = mongoose.Schema({     //modele user
   // userId: {type: string, required: true}, //identifiant unique MongoDB pour l'utilisateur qui a créé la sauce 
    email: {type: string, required: true},  //adresse électronique de l'utilisateur [unique] 
    password: {type: string, required: true} // hachage du mot de passe de l'utilisateur

})

module.exports = mongoose.model('utilisateur', schemaUtilisateur);      //exportation modele