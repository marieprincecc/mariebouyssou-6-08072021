const sauce = require('../models/sauce');   //importation modele sauce
const fs = require('fs');
const user = require('../models/utilisateur')    //importation modele user
const jwt = require('jsonwebtoken');

exports.getOneSauce = (req, res, next) => {   //affichage d'une seule sauces
    sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces =  (req, res, next) => {       // acces affichage toutes les sauces
    sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {   //enregistrement nouvelle sauce dans la base de données !!!! VERIFIER SCHEMA!!!
  const sauceObject = JSON.parse(req.body.sauce)  //on transforme pour avoir un object utilisable
  const Sauce = new sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //recuperation de l'url
    });
    Sauce.save()
      .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce =  (req, res, next) => {   //modification sauce
  const sauceObject = req.file ?
  {
    ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //recuperation de l'url
  } : { ...req.body };
  sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    
    .then(() => res.status(200).json({sauce}))
    .catch( error => res.status(400).json({error}))
};

exports.deleteSauce =  (req, res, next) => {   // suppression de sauce
  sauce.findOne({ _id: req.params.id })     //recuperation sauce avec id
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];   //recuperation du nom du fichier image
    fs.unlink(`images/${filename}`, () => {         //suppression du fichier image
      sauce.deleteOne({ _id: req.params.id })     //suppression de la sauce
      .then(() => res.status(200).json({message:'sauce supprimé!'}))
      .catch( error => res.status(400).json({error}));
    });
  })
  
    .catch(error => res.status(500).json({ error }));
};

exports.LikeDislike = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];          //on recupère le token dans les headers
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');     //on decode le token
  const userId = decodedToken.userId;
  const verificationLike = sauce.findOne({ _id: req.params.id },{'usersLiked': { '$elemMatch': { userId } }});
  const verificationDislike = sauce.findOne({ _id: req.params.id },{'usersDisliked': { '$elemMatch': { userId } }});
  if (!verificationLike || req.body.like==1 ) {
    sauce.updateOne({ _id: req.params.id },{'$set':{'usersLiked':userId}})
  .then(() => res.status(200).json({message:'like'}))
  .catch( error => res.status(400).json({error}));
  }
  if(req.body.like==0){
    sauce.updateOne({ _id: req.params.id },{'$unset':{'usersDisliked':userId}} )
.then(() => res.status(200).json({message:'neutre'}))
.catch( error => res.status(400).json({error}));
sauce.updateOne({ _id: req.params.id },{'$unset':{'usersLiked':userId}} )
.then(() => res.status(200).json({message:'neutre'}))
.catch( error => res.status(400).json({error}));
  }
if (!verificationDislike || req.body.like==-1 ) {
  sauce.updateOne({ _id: req.params.id },{'$set':{'usersDisliked':userId}})
.then(() => res.status(200).json({message:'dislike'}))
.catch( error => res.status(400).json({error}));
}
 
}


