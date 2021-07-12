const express = require("express");
const router = express.Router();

const authCtrl = require('../controllers/auth')

router.post('/signup', authCtrl.createUser);
router.post('/login', authCtrl.logingUser);

module.exports = router;