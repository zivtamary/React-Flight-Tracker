const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// User Model
const User = require("../models/User");


//Middleware to check if user is already authenticated
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.status(200).json({ auth: true });
  } else {
    next();
  }
};

router.post("/", redirectHome, (req, res) => {
  const { name, lastName, username, password } = req.body;

  // Simple validation
  if (!name || !lastName || !username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      lastName,
      username,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) res.status(401).json({msg: 'bad password'})
        newUser.password = hash;
        newUser.save().then(user => {
            res.json({auth:true, user:user._id});
        });
      });
    });
  });
});
module.exports = router;
