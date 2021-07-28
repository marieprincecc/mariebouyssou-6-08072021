const mongoose = require('mongoose')        //importation mongoose
const uniqueValidator = require('mongoose-unique-validator');   //pour les entrées uniques




const schemaUtilisateur = mongoose.Schema({     //modele user
  
    email: {                                            //adresse électronique de l'utilisateur 
        type: String, 
        required: true, 
        unique:true
          },
            
    password: {                                                 //mot de passe de l'utilisateur
        type: String,
        required: true,
    } 

})

schemaUtilisateur.plugin(uniqueValidator); //application du plugin
module.exports = mongoose.model('user', schemaUtilisateur);      //exportation modele