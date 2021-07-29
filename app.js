const express = require('express')    //importation express (facilite la gestion de server)
const bodyParser = require('body-parser')   //importation body-parser (permet de gerer les demande avec json)
const mongoose = require('mongoose')    //importation mongoose(permet la comunication avec mongoDB)
const helmet = require('helmet')        //importation helmet securité
const saucesRoutes = require('./routes/sauces')
const authRoutes = require('./routes/auth')
const base = require('./environement/bdd'); //importation variables bdd
const name = base.name;
const mdp = base.mdp;
const cluster = base.cluster;
const bdd = base.bdd;
const path = require('path')
const app = express()                           //const app utilisant express

//connection a la base de donnée
mongoose.connect('mongodb+srv://' + name + ':'+ mdp +'@'+cluster+'.j8kf4.mongodb.net/'+bdd+'?retryWrites=true&w=majority',
 { useNewUrlParser: true, useUnifiedTopology: true })      //conection a mongoDB penser a modifier <password> par le mot de passe renvoi une promesse donc then et catch
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDb a échouée!'));

 //permet l'acces a tout utilisateur autorise les header au requete et defini les requete possible
app.use((req, res, next) => {      
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();   //toujours next() pour passer au middelware suivant
  });

  app.use(bodyParser.json());     //converti toute les reponse en format utilisable (json)
  app.use(helmet());            //inclu directement helmet a l'app
  app.use(helmet.xssFilter());   //inclu l’en-tête X-XSS-Protection
  app.use(helmet.noSniff());    // empêche le navigateur de deviner le type du fichier (empeche par exemple attaque GIFAR)
  app.use(helmet.frameguard({ action: 'deny' })); //interdit l'ouverture d'une page légitime à l’intérieur d’une iframe

  app.use('/images', express.static(path.join(__dirname, 'images')));   //indique a express d'utiliser les ressources image en static
  app.use('/api/sauces',saucesRoutes);
  app.use('/api/auth',authRoutes);

  module.exports = app;      //exportation de app (pour server.js)