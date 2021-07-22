const sauce = require('../models/sauce');   //importation modele sauce
const fs = require('fs');
 
exports.getOneSauce = (req, res, next) => {   //affichage d'une seule sauces
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces =  (req, res, next) => {       // acces affichage toutes les sauces
  sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.createSauce = (req, res, next) => {   //enregistrement nouvelle sauce dans la base de données !!!! VERIFIER SCHEMA!!!
  const sauceObject = JSON.parse(req.body.sauce)  //on transforme pour avoir un object utilisable
  const Sauce = new sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //recuperation de l'url
  });
    
  Sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce =  (req, res, next) => {   //modification sauce
  const sauceObject = req.file ?  
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //recuperation de l'url
  } : { ...req.body};
  if(req.file){
    sauce.findOne({ _id: req.params.id })     //recuperation sauce avec id
      .then(Sauce => {
        const filename1 = Sauce.imageUrl.split('/images/')[1];   //recuperation du nom du fichier image
        fs.unlink(`images/${filename1}`, () => {
          sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id},{runValidators: true})
            .then(() => res.status(200).json({message:'sauce modifiee'}))
            .catch( error => res.status(400).json({error}))
      })
    })
      .catch( error => res.status(500).json({error}))
  }else{
    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id},{runValidators: true})
    
      .then(() => res.status(200).json({sauce}))
      .catch( error => res.status(400).json({error}))
  }
};

exports.deleteSauce =  (req, res, next) => {   // suppression de sauce
  sauce.findOne({ _id: req.params.id })     //recuperation sauce avec id
    . then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];   //recuperation du nom du fichier image
        fs.unlink(`images/${filename}`, () => {         //suppression du fichier image
        sauce.deleteOne({ _id: req.params.id })     //suppression de la sauce
          .then(() => res.status(200).json({message:'sauce supprimé!'}))
          .catch( error => res.status(400).json({error}));
        });
      })
  
    .catch(error => res.status(500).json({ error }));
};

exports.LikeDislike = (req, res, next) => {
  const userId = req.body.userId;                           //recuperation du userId
  
  sauce.findOne({ _id: req.params.id })                         //recuperation de la sauce
    .then(Sauce => {
      let UsersLiked = Sauce.usersLiked;
      let UsersDisliked = Sauce.usersDisliked;

      if (req.body.like==1 ) {  
        if(UsersLiked.find(element=> element === userId)){                    //si userId pas dans usersLiked
          alert("déja liké!")}
          else{
            sauce.updateOne({ _id: req.params.id },{'$push':{'usersLiked':userId},'$inc':{'likes':1}})
                .then(() => res.status(201).json({ message: 'like!'}))
                .catch(error => res.status(400).json({ error }));            
          }                                                         // +1 a likes
      }
      
      if (req.body.like == 0){
        if(UsersLiked.find(element=> element === userId)){
          sauce.updateOne({ _id: req.params.id },{'$pull':{'usersLiked':userId},'$inc':{'likes':-1}})
              .then(() => res.status(201).json({message:'sauce 0'}))
              .catch(error => res.status(400).json({ error }));
        }else{
          if( UsersDisliked.find(element=> element === userId)){           //si userId dans usersDisliked
            sauce.updateOne({ _id: req.params.id },{'$pull':{'usersDisliked':userId},'$inc':{'dislikes':-1}})
              .then(() => res.status(201).json({message:'sauce 0'}))
              .catch(error => res.status(400).json({ error }));
          }
        }
         
      }
 
      if (req.body.like==-1 ) {
        if( UsersDisliked.find(element=> element === userId)) {            //verification si userId present dans usersDisliked
          alert("déja disliké!")}
          else{
            sauce.updateOne({ _id: req.params.id },{'$push':{'usersDisliked':userId},'$inc':{'dislikes':1}})
                .then(() => res.status(201).json({ message: 'dislike!'}))
                .catch(error => res.status(400).json({ error }));                                                   //+1 a dislikes
          }
      }

    if(!sauce){
      return ( error => res.status(404).json({error}))
    }
       
    })
    .catch(error => res.status(500).json({error}));
}

