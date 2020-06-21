// const bodyParser = require("body-parser");


$(document).ready(function () {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-60px";
    }
    prevScrollpos = currentScrollPos;
  };

  let xhr = new XMLHttpRequest();
  document.getElementById("register").addEventListener("click",function(){

    let personDetails = {};
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let mobNumber = document.getElementById("mobnum").value;
    let email = document.getElementById("email").value;
    let place = document.getElementById("place").value;
    let bloodGrouptemp = document.getElementById("bloodgroup");
    let bloodGroup = bloodGrouptemp.options[bloodGrouptemp.selectedIndex].value;
    personDetails = {"FirstName" :firstName,"LastName" :lastName,"MobileNumber" :mobNumber,"EmailID" :email,"Place" :place,"BloodGroup" :bloodGroup};
    
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log (this.responseText);
        document.getElementById("firstname").value = " ";
        document.getElementById("lastname").value = " ";
        document.getElementById("mobnum").value = " ";
        document.getElementById("email").value = " ";
        document.getElementById("place").value = " ";
        bloodGrouptemp.options[0].innerHTML = "Blood Group";
      }
    }

    xhr.open("post","/",true);
    xhr.setRequestHeader("content-type","application/json");
    xhr.send(JSON.stringify(personDetails));
    console.log(personDetails);

  });

  document.getElementById("searchlogo").addEventListener("click",function(){
    // let main = document.getElementsByClassName("main");
    let animation = document.getElementById("animationDiv");
    let searchlogo = document.getElementById("searchlogo");
    let searchDonarbtn = document.getElementById("search-donarBtn");
    let searchDonarinputr = document.getElementById("search-donar-input");
    
    
    // if( animation[0].style.display ===""){
      animation.classList.add("searchdiv-animation");
      searchlogo.style.display = "none";
      searchDonarbtn.style.display = "block";
      searchDonarinputr.style.display  = "block";
    // }
  });

  document.getElementById("searchbtn").addEventListener("click",function(){
    let searchPlace = document.getElementById("searchPlace").value;
    let searchBloodgroup = document.getElementById("search-bloodgroup").value;
    let searchOption = {
      "Place" : searchPlace,
      "BloodGroup" : searchBloodgroup
    };

    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
      console.log (this.responseText);
      }
    }
    
        xhr.open("post","/findData",true);
    xhr.setRequestHeader("content-type","application/json");
    xhr.send(JSON.stringify(searchOption));
    console.log(searchOption);

  });
});
