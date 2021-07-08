const mongoose = require('mongoose')

const schemaUtilisateur = mongoose.Schema({
   // userId: {type: string, required: true}, //identifiant unique MongoDB pour l'utilisateur qui a créé la sauce 
    email: {type: string, required: true},  //adresse électronique de l'utilisateur [unique] 
    password: {type: string, required: true} // hachage du mot de passe de l'utilisateur

})

module.exports = mongoose.model('utilisateur', schemaUtilisateur);