const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Import Routes
const earnRouter = require('./RouterHandler/earnHandler');
const spendRouter = require('./RouterHandler/spendRouter');

const port = process.env.PORT || 3500
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aew8x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose connect
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log('mongoose connected successfully'))
  .catch((err) => console.log(err));

// Application Router
app.use('/earn', earnRouter);
app.use('/spend', spendRouter);

app.listen(port, () => console.log("I am listening"));