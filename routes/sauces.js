const express = require('express')
const router = express.Router();
const authentification = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const verificationUser = require('../middleware/userId');


router.get('/',authentification, saucesCtrl.getAllSauces);
router.get('/:id',authentification, saucesCtrl.getOneSauce);
router.post('/',authentification, multer, saucesCtrl.createSauce);
router.put('/:id',authentification, verificationUser, multer, saucesCtrl.modifySauce);
router.delete('/:id',authentification, verificationUser, saucesCtrl.deleteSauce);
router.post('/:id/like', authentification, saucesCtrl.LikeDislike);

module.exports = router;