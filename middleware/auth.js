const jwt = require('jsonwebtoken');
const keys = require('../environement/keys');
const tokenKey = keys.tokenKey;

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];          //on recupère le token dans les headers
    const decodedToken = jwt.verify(token, tokenKey);                  //on decode le token
    const userId = decodedToken.userId;                                //on met l'objet dans une const
    if (req.body.userId && req.body.userId !== userId) {                // si apres verificaton le token est different du token de la requet
      throw 'Invalid user ID';
    } else {                                                        //s'il est identique c'est ok on continue
      next();
    }
  }catch {
    res.status(401).json({
    error: new Error('Invalid request!')
    });
  }
}
