const express = require("express")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
mongoose.connect('mongodb+srv://marie_user_01:MonMotDePass@cluster0-marie.j8kf4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use(ici url de demande, (req, res, next) => {
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


module.exports = app