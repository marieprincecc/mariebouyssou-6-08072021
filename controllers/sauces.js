const sauce = require('../models/sauce');   //importation modele sauce
const fs = require('fs');

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
}

