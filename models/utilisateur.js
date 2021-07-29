const mongoose = require('mongoose')        //importation mongoose
const uniqueValidator = require('mongoose-unique-validator');   //pour les entrées uniques




const schemaUtilisateur = mongoose.Schema({     //modele user
  
    email: {type: String, required: true, unique:true},          //adresse électronique de l'utilisateur    
    password: {   type: String, required: true}                  //mot de passe de l'utilisateur
 
})

schemaUtilisateur.plugin(uniqueValidator);                          //application du plugin
module.exports = mongoose.model('user', schemaUtilisateur);      //exportation modele