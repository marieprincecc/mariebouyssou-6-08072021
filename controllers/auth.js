const user = require('../models/utilisateur')    //importation modele user

exports.createUser = (req, res, next) => {   //enregistrement nouvel utilisateur dans la base de données
    const User = new user({
      ...req.body
    });
    User.save()
      .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.logingUser = (req, res, next) => {   //authentification utilisateur !!!! A COMPLETER
    const User = {...req.body}
      .then(User => res.status(200).json({userId},{token}))
      .catch(error => res.status(400).json({ error }));
  }  