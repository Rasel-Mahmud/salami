const express = require('express');
const ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose');
const spendRouter = express.Router();
const checkLogin = require('./../middleware/checkLogin');

const spendSchema = require('./../Schema/spendSchema');
const Spend = mongoose.model('spend', spendSchema);

// Add spends
spendRouter.post('/', checkLogin, async (req, res)=> {
  const spendData = new Spend({...req.body, user: req.id});
  try{
    await spendData.save();
    res.status(200).json({
      data : spendData,
      message: "Spend was successfully added!"
    })
  } catch(err) {
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

});

// Get all spend
spendRouter.get('/all', checkLogin, async (req, res)=> {
  const allSpendData = await Spend.find().populate('user', "username email");
  try{
    res.status(200).json({
      data : allSpendData,
      message: "Spend Data fetch successfully!"
    })
  } catch(err) {
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

})


// Remove a spend
spendRouter.post('/id', async (req, res)=> {
  const SpendID = await Spend.deleteOne({_id: ObjectId(req.body.id)});

  try{
    res.status(200).json({
      data : SpendID,
      message: "Spend Data fetch successfully!"
    })
  } catch(err) {
    res.status(500).json({
      err : err.message,
      message: "There was a server side error"
    })
  }

})

module.exports = spendRouter;