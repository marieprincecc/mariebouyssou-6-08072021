const express = require("express")    //importation express (facilite la gestion de server)
const bodyParser = require('body-parser')   //importation body-parser (permet de gerer les demande avec json)
const mongoose = require('mongoose')    //importation mongoose(permet la comunication avec mongoDB)

const sauce = require('./models/sauce')   //importation modele sauce
const user = require('./models/utilisateur')    //importation modele user

const app = express()   //const app utilisant expresse
mongoose.connect('mongodb+srv://marie_user_01:MonMotDePass@cluster0-marie.j8kf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,        //conection a mongoDB penser a modifier <password> par le mot de passe renvoi une promesse donc then et catch
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {       //permet l'acces a tout utilisateur autorise les header au requete et defini les requete possible
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();   //toujours next() pour passer au middelware suivant
  });

  app.use(bodyParser.json());     //converti toute les reponse en format utilisable (json)

  app.use(ici url de demande, (req, res, next) => {   //premier middelware si "use" concerne toute les requet sinon utiliser le verbe de requete
    const objetAenvoyé = [
      {
        //object
      },
      {
        //objet
      },
    ];
    res.status(200).json(stuff);
  });


module.exports = app      //exportation de app (pour server.js)