const express = require('express')
const router = express.Router();
const authentification = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');


router.get('/',authentification, saucesCtrl.getAllSauces);
router.get('/:id',authentification, saucesCtrl.getOneSauce);
router.post('/',authentification, multer, saucesCtrl.createSauce);
router.put('/:id',authentification, multer, saucesCtrl.modifySauce);
router.delete('/:id',authentification, saucesCtrl.deleteSauce);

module.exports = router;