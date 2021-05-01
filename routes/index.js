const express = require('express');
const Music = require('../model/Music');
const router = express.Router();
const Users = require('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Post home page. */
router.post('/register', function(req, res, next) {
  const {username, password} = req.body

  // const user = new Users({
  //   username,
  //   password
  // })
  bcrypt.hash(password, 10, (err, hash) => {
    const user = new Users({
      username,
      password: hash
    })
    const promise = user.save()
    promise.then(data => res.json(data))
    .catch(err => 
    {console.log(err)
    })
  })
});



/* GET authenticate. */
router.post('/authenticate', function(req, res, next) {
  const {username, password} = req.body

  Users.findOne({username}, (err, user) => {
    if(err)
      throw err
    if(!user){
      res.json({
        status: 'topilmadi',
        message: `kirish amalga oshmadi`
      })
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          res.json({
            status: false,
            message: 'foydalanuvchi paroli hato'
          })
        }else{
          const payload = {username}
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          })
          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
});


module.exports = router;
