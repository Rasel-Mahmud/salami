const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId
const earnRouter = express.Router();

const earnSchema = require('../Schema/earnSchema');
const Earn = new mongoose.model('earn', earnSchema);

// add salami in the database
earnRouter.post('/', async (req, res) =>{
  const earnData = new Earn(req.body);

  try {
    await earnData.save();

    res.status(200).json({
      data : earnData,
      message: "Earn was successfully added!"
    })
  } catch(err) {
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

});

// pull all salami data
earnRouter.get('/all', async (req, res) => {
  const allSalami = await Earn.find({});
  
  try {
    res.status(200).json({
      data : allSalami,
      message: "Fetch All Data Successfully"
    })
  }catch(err){
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

})

// remove Salami data by ID
earnRouter.post('/id', async (req, res) => {
  const deleteEarnData = await Earn.deleteOne({_id: ObjectId(req.body.id)});
  console.log(ObjectId(req.body.id))
  console.log(deleteEarnData)
  try {
    res.status(200).json({
      data : deleteEarnData,
      message: "Removed successfully"
    })
  } catch(err){
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

})

module.exports = earnRouter;