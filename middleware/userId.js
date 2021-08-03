const jwt = require('jsonwebtoken');
const keys = require('../environement/keys');
const tokenKey = keys.tokenKey;

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];          //on recupère le token dans les headers
        const decodedToken = jwt.verify(token, tokenKey);                  //on decode le token
        const userId = decodedToken.userId;                                //on met l'objet dans une const
        sauce.findOne({ _id: req.params.id })                   //recuperation sauce avec id
        .then(sauce => {
          const sauceId = sauce.userId;   
          if (sauceId !== userId) {                // si apres verificaton le token est different du token de la requet
          throw 'Invalid';
        } else {                                                        //s'il est identique c'est ok on continue
          next();
        }})
        .catch( error => res.status(400).json({error}));
      }catch {
        res.status(401).json({
        error: new Error('Invalid request!')
        });
      }
  }

      
 