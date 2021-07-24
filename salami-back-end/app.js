const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();

const port = process.env.PORT || 3500
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aew8x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const earnCollection = client.db("salami").collection("earn");

  // add salami in the database
  app.post('/earn', (req, res) =>{
    const earnData = req.body;
    earnCollection.insertOne(earnData)
    .then( result => {
      res.status(200).send({success: "Added successfully"})
    })
  });
  
  // pull all salami data
  app.get('/all-salami', (req, res) => {
    const allSalami = req.body;
    earnCollection.find()
    .toArray((err, doc) => {
      res.send(doc)
    })
  })

  // remove Salami data by ID
  app.post('/remove-salami-by-id', (req, res) => {
    earnCollection.deleteOne({_id: ObjectId(req.body.id)})
    .then(result => {
      if(result.deletedCount) res.send({success: "Item Removed successfully"})
    })

  })
  
});


app.listen(port, () => console.log("I am listening"));