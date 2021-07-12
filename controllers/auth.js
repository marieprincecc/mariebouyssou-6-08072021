const bcrypt = require('bcrypt');

const user = require('../models/utilisateur')    //importation modele user

exports.createUser = (req, res, next) => {   //enregistrement nouvel utilisateur dans la base de données
  bcrypt.hash(req.body.password, 10)        //hashage du mot de passe
      .then(hash => {
    const User = new user({
      email: req.body.email,
      password: hash
    });
    User.save()
      .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  })
      .catch(error => res.status(500).json({ error }));
  };

exports.logingUser = (req, res, next) => {   //authentification utilisateur !!!! A COMPLETER
    const User = {...req.body}
      .then(User => res.status(200).json({userId},{token}))
      .catch(error => res.status(400).json({ error }));
  }  