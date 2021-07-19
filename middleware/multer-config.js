const multer = require('multer');

const MIME_TYPES = {            //"dictionnaire mine-type"
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            //definition du storage
  destination: (req, file, callback) => {
    callback(null, 'images');                   //dans dossier images
  },
  filename: (req, file, callback) => {          //nom a donner au fichier entrant
    const nameFile = file.originalname.split('.')[0];
    const name = nameFile.split(' ').join('_');        // on remplace les espace par "_"
    const extension = MIME_TYPES[file.mimetype];            //on ajoute le mine type
    callback(null, name + Date.now() + '.' + extension);       // nom = name +  timestamp + "." +  extension
  }
});

module.exports = multer({storage: storage}).single('image');        //export element multer entièrement configuré, avec la const storage pour les téléchargements de fichiers image.