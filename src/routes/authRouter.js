
"use strict"
const router= require('express').Router();
const {authController} = require('../controllers/authController');
const validateToken = require('../middlewares/validateTokenHandler');
router.post('/login',authController.login)
router.all('/logout',validateToken,authController.logout)
router.get('/current',validateToken, authController.current)



module.exports = router