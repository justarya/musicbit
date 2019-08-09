if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/musicbit', {useNewUrlParser: true});

app.use('/', routes);

app.use(function(err,req,res,next){
  res.status(500).json({
    error: err
  })
});

app.listen(port, () =>  console.log(`Server is runing in PORT: ${port}`));