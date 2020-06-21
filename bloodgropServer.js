// const dotenv = require('dotenv').config();
// const cool = require('cool-ascii-faces');
const fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

let personDetails=[] ;

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(function(req,res,next){
    next();
});



app.post('/',function(req,res){
  var receivedData =(req.body);
  // console.log(typeof (receivedData)+receivedData.Place);
  writeTofileAsDB(receivedData);
  res.send("You are successfully registered, Now you are a member of our family ");
  res.end();
  
});

app.post('/findData',function(req,res){
  var findMatch =[] ;
   
  console.log(req.body);
  dataFromFile = readTofileAsDB(); 
  // console.log(dataFromFile);
   //check the value from the client with the json array(DB)
  // if a value match then take the value and sent to back
  for(var counter =0;counter < dataFromFile.length;counter++){
    if(dataFromFile[counter].Place === req.body.Place && dataFromFile[counter].BloodGroup === req.body.BloodGroup){
      console.log("find matches "+counter);
      findMatch.push(dataFromFile[counter]); 
    }
  };
 

  res.json(findMatch);
  res.end();

});


  app.listen(port,function(){
    console.log("Server listen at port 8000");
});


function writeTofileAsDB(receivedData){
  
  personDetails.push(receivedData);
  console.log(personDetails);

  fs.writeFile('Db/Blood-groupAddress.json', JSON.stringify(personDetails),function (err){
    if(err){
      console.log(err);
    }else{
      console.log("file writing success");
    }
  });
}

function readTofileAsDB(){
  console.log("readfile...........")
  let personDetailsfromDB ;
  let data = fs.readFileSync('Db/Blood-groupAddress.json', 'utf8');
      personDetailsfromDB = JSON.parse(data);
      // console.log(typeof(personDetailsfromDB));
      // console.log(personDetailsfromDB[0]);
      return(personDetailsfromDB);
  
}
