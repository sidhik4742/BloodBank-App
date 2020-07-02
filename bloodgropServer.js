// const dotenv = require('dotenv').config();
// const cool = require('cool-ascii-faces');
const fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

let personDetails = [];
let mobnumMatched = false;

var app = express();
var port = process.env.PORT || 8000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  next();
});

app.post("/", function (req, res) {
  var receivedData = req.body;
  // console.log(typeof (receivedData)+receivedData.Place);
  alreadyAMember(receivedData);
  if(mobnumMatched === true){
    // console.log("you are already a member");
    res.send("You are already a member of our family");
    mobnumMatched = false;
  }else{
    writeTofileAsDB(receivedData);
    // console.log("thank you for registering");
    res.send(
    "Thank you for registering, Now you are a member of our family "
    );
  }
  res.end();
});

app.post("/findData", function (req, res) {
  var findMatch = [];

  // console.log(req.body);
  dataFromFile = readTofileAsDB();
  // console.log(dataFromFile);
  //check the value from the client with the json array(DB)
  // if a value match then take the value and sent to back
  for (var counter = 0; counter < dataFromFile.length; counter++) {
    if (
      dataFromFile[counter].District === req.body.District ||
      dataFromFile[counter].BloodGroup === req.body.BloodGroup
    ) {
      findMatch.push(dataFromFile[counter]);
    }
  }
  // console.log("No. of matches found = "+findMatch.length);

  res.json(findMatch);
  res.end();
});

app.listen(port, function () {
  // console.log("Server listen at port 8000");
});

function writeTofileAsDB(receivedData) {
  personDetails.push(receivedData);
  // console.log(personDetails);

  fs.writeFile(
    "Db/Blood-groupAddress.json",
    JSON.stringify(personDetails),
    function (err) {
      if (err) {
        console.log(err);
      } else {
        // console.log("file writing success");
      }
    }
  );
}

function readTofileAsDB() {
  // console.log("readfile...........")
  let personDetailsfromDB;
  let data = fs.readFileSync("Db/Blood-groupAddress.json", "utf8");
  try {
    personDetailsfromDB = JSON.parse(data);
  } catch (err) {
    console.log( "error = "+err);
    throw err;
  }
  // console.log(typeof(personDetailsfromDB));
  // console.log(personDetailsfromDB[0]);
  // console.log(typeof (personDetailsfromDB));
  // console.log(personDetailsfromDB);
  
  return personDetailsfromDB;
}

function alreadyAMember(receivedData) {
  let alreadyMember = readTofileAsDB();
  // console.log(typeof (alreadyMember)) 
  // console.log(alreadyMember[0].MobileNumber);
  for(matchingCounter = 0; matchingCounter < alreadyMember.length;matchingCounter++){
    if(receivedData.MobileNumber === alreadyMember[matchingCounter].MobileNumber){
      mobnumMatched = true;
      // console.log(mobnumMatched);
      break;
    }
  }
}
