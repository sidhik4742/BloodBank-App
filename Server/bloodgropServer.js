const dotenv = require('dotenv').config();
const cool = require('cool-ascii-faces');
const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

app.use(function(req,res,next){
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));

let Data = {};
const dateTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  fs.appendFile('Db/Blood-groupAddress.txt',dateTime + "\n" + JSON.stringify(Data) + "\n",function (err){
    if(err){
      console.log(err);
    }else{
      console.log("file writing success");
    }
  });

  app.listen(port,function(){
    console.log("Server listen at port 8000");
});
