const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/utilisateur');    //importation 
const crypto = require ('crypto');
const keys = require('../environement/keys');

const algorithme = 'aes-256-cbc';               //algorithme
const key = keys.key;                            //clé secrete
const tokenKey = keys.tokenKey;                   //clé token

const regexMail = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ 
const regexPassword = /^[a-zA-Z0-9]+[^\s'$=]{8,20}$/

//Fonction cryptage
const encrypte = (text)=>{
  let cipher = crypto.createCipher (algorithme,key);
  let encrypted = cipher.update (text);
  return encrypted
};

//Signup
exports.createUser = (req, res, next) => {   //creation nouvel utilisateur

  if(regexMail.test(req.body.email)&&regexPassword.test(req.body.password)){

    let mail = encrypte(req.body.email);      //cryptage email
    bcrypt.hash(req.body.password, 10)        //hashage du mot de passe

      .then(hash => {
        const User = new user({                 // creation new user avec hash du mdp
        email: mail,
        password: hash
        });
      User.save()                           //enregistrement nouvel utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));

  }else{console.log('non conforme')}
};

//Login
exports.logingUser = (req, res, next) => {   //authentification utilisateur 

  let loginMail= encrypte(req.body.email);  //cruptage de l'email de la requete

  user.findOne({email : loginMail})     // on cherche l'utilisateur correspondant a l'email de la requet
    .then(User => {
      if (!User) {     
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, User.password)    //si trouvé on compare le password avec bcrypt
        .then(valid => {
          if (!valid) {                     //si mdp incorrect
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({            //si mot de passe correct on renvoi la reponse attendu
            userId: User._id,
            token: jwt.sign({ userId: User._id },//methode signe pour encoder un nouveau token, userId 
            tokenKey,                           //chaîne secrète de développement temporaire 
            { expiresIn: '10h' })                 //durée de validité du token
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}  