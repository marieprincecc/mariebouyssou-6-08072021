const mongoose = require('mongoose')        //importation mongoose

const schemaSauce = mongoose.Schema({       //modele sauce
    userId: {type: string, required: true}, // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce ;
    name: {type: string, required: true}, // nom de la sauce ;
    manufacturer: {type: string, required: true}, //fabricant de la sauce ;
    description:{type: string, required: true}, //description de la sauce ;
     mainPepper: {type: string, required: true}, //principal ingrédient dans la sauce ;
    imageUrl: {type: string, required: true}, // string de l'image de la sauce téléchargée par l'utilisateur ;
    heat: {type: number, required: true}, // nombre entre 1 et 10 décrivant la sauce ;
    likes: {type: number, required: true}, // nombre d'utilisateurs qui aiment la sauce ;
    dislikes: {type: number, required: true} ,// nombre d'utilisateurs qui n'aiment pas la sauce ;
    usersLiked: {type: [string], required: true},  // tableau d'identifiants d'utilisateurs ayant aimé la sauce;
    usersDisliked: {type: [string], required: true}, // tableau d'identifiants d'utilisateurs n'ayant pas aiméla sauce.
})

module.exports = mongoose.model('sauce', schemaSauce);      //exportation du modele