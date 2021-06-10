let User = require('../model/user');
let bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

exports.checkLogined = (req, res, next) => {
  if ( req.url === '/login') {
      if (localStorage.getItem('userToken')) {
          res.redirect('/')
      }
      return next();
  }
  if (localStorage.getItem('userToken')) {
      next();
  } else {
      res.redirect('/login');
  }
}

exports.getLogout = (req, res) => {
  localStorage.removeItem('userToken');
  res.redirect('/login');

}

exports.getLogin = (req, res) => {
  res.render('login', {title:'Login'})
}
exports.postLogin = (req, res) => {

  User.findAll({
      attributes: ['password', 'id'],
      raw: true,
      where: [{
          email: req.body.email
      }]
  }).then(result => {
      try {
          if (bcrypt.compareSync(req.body.password, result[0].password)) {
              var token = jwt.sign({
                  userId: result[0].id
              }, 'loginToken');

              localStorage.setItem('userToken', token)

              res.send("You are loggin successfully");
          }else{
            res.send("Password is invalid");  
          }
      } catch (err) {
          res.send("Email is invalid");
      }

  });
}





