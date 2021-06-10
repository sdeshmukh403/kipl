var express = require('express');
var router = express.Router();
let authController = require('../controller/AuthController');


/* GET home page. */

router.all('*', authController.checkLogined);

router.get('/', function(req, res){
  res.send('Home Page')
});

//auth
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);

//home
module.exports = router;
