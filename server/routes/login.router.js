const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// User Model
const User = require('../models/User');


//Middleware to check if user is already authenticated
const redirectHome = (req, res, next) => {
    if (req.session.userId) {
      res.status(200).json({ auth: true, user: req.session.userId })
    } else {
      next();
    }
  };


router.post('/', redirectHome, (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({msg: 'Please enter all fields' });
    }
    
    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User Does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                    const userSession = {id:user._id, name:user.name, last_name: user.lastName, role:user.role}
                    req.session.userId = userSession
                    res.status(200).json({ auth: true, user:userSession})
          
                });
        });
});

module.exports = router;