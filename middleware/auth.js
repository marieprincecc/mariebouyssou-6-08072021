const jwt = require('jsonwebtoken');
const keys = require('../environement/keys');
const tokenKey = keys.tokenKey;

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];          //on recupère le token dans les headers
    const decodedToken = jwt.verify(token, tokenKey);                  //on decode le token
    const userId = decodedToken.userId;                                //on met l'objet dans une const (on a donc l'id de user)
    if (req.body.userId && req.body.userId !== userId) {                // on compare userId extrait du token et celui de la requete (donc userId du créateur de la sauce)s'ils sont different on renvoi une erreur
      throw 'Invalid user ID';
    } else {                                                        //s'ils sont identique c'est ok on continue
      next();
    }
  }catch {
    res.status(401).json({
    error: new Error('Invalid request!')
    });
  }
}
