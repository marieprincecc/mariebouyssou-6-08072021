const sauce = require('../models/sauce')   //importation modele sauce

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
    const Sauce = new sauce({
      ...req.body
    });
    Sauce.save()
      .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce =  (req, res, next) => {   //modification sauce
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({sauce}))
    .catch( error => res.status(400).json({error}))
};

exports.deleteSauce =  (req, res, next) => {   // suppression de sauce
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message:'sauce supprimé!'}))
    .catch( error => res.status(400).json({error}))
}

