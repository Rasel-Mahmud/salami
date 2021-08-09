const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const checkLogin = require('./../middleware/checkLogin');

const userSchema = require('./../Schema/userSchema');
const User = new mongoose.model('user', userSchema);

// get All User
userRouter.get('/', async (req, res) => {
  const allUser = await User.find();
  try {
    res.status(200).json({
      data : allUser,
      message: "user fetch successfully"
    })
  } catch(err){
    res.status(500).json({
      error: err,
      message: "There was a server side error"
    })
  }

})

// Add a new user 
userRouter.post('/register', async (req, res) => {
  const getUser = await User.find({email: req.body.email});
  // Check if user already exist
  if(getUser.length > 0){
    return res.status(500).json({
      message: "You have already registered"
    });
  }
  
  // encrypt the password
  const hasPassword = await bcrypt.hash(req.body.password, 10);
  
  // Create new user with Encrypted password
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hasPassword
  });

  try {
    await newUser.save(newUser);

    res.status(200).json({
      data : newUser,
      message: "user Added successfully"
    })
  } catch(err) {
    res.status(500).json({
      error: err,
      message: "There was a server side error"
    })
  }
})

// Login
userRouter.post('/login', async (req, res) => {
  const loginData = new User(req.body);
  const getUser = await User.find({email: req.body.email});
  
  // if user not found
  if(getUser.length < 1){
    return res.status(200).json({
      message: "User not found"
    });
  }
  const verifyPassword = await bcrypt.compare(req.body.password, getUser[0].password);
  
  // if password not matched
  if(verifyPassword === false){
    return res.status(200).json({
      message: "Wrong Password"
    });
  };

  const token = jwt.sign({
    name: getUser[0].username,
    id: getUser[0]._id 
  }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  try {
    res.status(200).json({
      access_token: token,
      data : loginData,
      message: "Login successfully"
    })
  } catch(err) {
    res.status(500).json({
      error: err,
      message: "There was a server side error"
    })
  }
});

module.exports = userRouter;