const express = require('express');
const router = express.Router();


// User Model
const User = require('../models/User');

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(400).json({msg:'Logout failed'})
    }
    res.clearCookie('sid')
    res.status(200).json({msg: 'Logged out'})
  })
  
})

module.exports = router;