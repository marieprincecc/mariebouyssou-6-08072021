const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/utilisateur');    //importation modele user

exports.createUser = (req, res, next) => {   //creation nouvel utilisateur

   bcrypt.hash(req.body.password, 10)        //hashage du mot de passe
   .then(hash => {
     const User = new user({                 // creation new user avec hash du mdp
      email: req.body.email,
      password: hash
    });
    User.save()                           //enregistrement nouvel utilisateur dans la base de données
    .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};


exports.logingUser = (req, res, next) => {   //authentification utilisateur !!!! A COMPLETER
      user.findOne({ email: req.body.email })   // on cherche l'utilisateur correspondant a l'email de la requet
      .then(User => {
        if (!User) {      //si non trouvé
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, User.password)    //si trouvé on compare le password avec bcrypt
          .then(valid => {
            if (!valid) {         //si mdp incorrect
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({      //si mot de passe correct on renvoi la reponse attendu
              userId: User._id,
              token: jwt.sign({ userId: User._id },//methode signe pour encoder un nouveau token, userId 
                'RANDOM_TOKEN_SECRET',      //chaîne secrète de développement temporaire 
                { expiresIn: '10h' })     //durée de validité du token
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }  