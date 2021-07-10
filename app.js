const express = require("express")    //importation express (facilite la gestion de server)
const bodyParser = require('body-parser')   //importation body-parser (permet de gerer les demande avec json)
const mongoose = require('mongoose')    //importation mongoose(permet la comunication avec mongoDB)

const sauce = require('./models/sauce')   //importation modele sauce
const user = require('./models/utilisateur')    //importation modele user
const { STATUS_CODES } = require("http")

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

  app.post('/api/auth/signup', (req, res, next) => {   //enregistrement nouvel utilisateur dans la base de données
    const User = new user({
      ...req.body
    });
    User.save()
      .then(() => res.status(201).json({ message: 'Nouvel utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.post('/api/auth/login', (req, res, next) => {   //authentification utilisateur !!!! A COMPLETER
    const User = {...req.body}
      .then(User => res.status(200).json({userId},{token}))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/sauces', (req, res, next) => {       // acces affichage toutes les sauces
    sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/sauces/:id', (req, res, next) => {   //affichage d'une seule sauces
    sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  });

  app.post('/api/sauces', (req, res, next) => {   //enregistrement nouvelle sauce dans la base de données !!!! VERIFIER SCHEMA!!!
    const Sauce = new sauce({
      ...req.body
    });
    Sauce.save()
      .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.put('/api/sauces/:id ', (req, res, next) => {   //modification sauce
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({sauce}))
    .catch( error => res.status(400).json({error}))
  });

  app.delete('/api/sauces/:id', (req, res, next) => {   // suppression de sauce
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message:'sauce supprimé!'}))
    .catch( error => res.status(400).json({error}))
  })
  


module.exports = app      //exportation de app (pour server.js)