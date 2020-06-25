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

  var tableClearingFlag = false;
  let xhr = new XMLHttpRequest();
  document.getElementById("register").addEventListener("click", function () {
    let personDetails = {};
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let mobNumber = document.getElementById("mobnum").value;
    let email = document.getElementById("email").value;
    let place = document.getElementById("place").value;
    let bloodGrouptemp = document.getElementById("bloodgroup");
    let bloodGroup = bloodGrouptemp.options[bloodGrouptemp.selectedIndex].value;
    personDetails = {
      FirstName: firstName,
      LastName: lastName,
      MobileNumber: mobNumber,
      EmailID: email,
      Place: place,
      BloodGroup: bloodGroup,
    };

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        document.getElementById("firstname").value = " ";
        document.getElementById("lastname").value = " ";
        document.getElementById("mobnum").value = " ";
        document.getElementById("email").value = " ";
        document.getElementById("place").value = " ";
        bloodGrouptemp.options[0].innerHTML = "Blood Group";
      }
    };

    xhr.open("post", "/", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(personDetails));
    console.log(personDetails);
  });

  document.getElementById("searchlogo").addEventListener("click", function () {
    // let main = document.getElementsByClassName("main");
    let animation = document.getElementById("animationDiv");
    let searchlogo = document.getElementById("searchlogo");
    let searchDonarbtn = document.getElementById("search-donarBtn");
    let searchDonarinputr = document.getElementById("search-donar-input");

    // if( animation[0].style.display ===""){
    animation.classList.add("searchdiv-animation");
    searchlogo.style.display = "none";
    searchDonarbtn.style.display = "block";
    searchDonarinputr.style.display = "block";
    // }
  });

  document.getElementById("searchbtn").addEventListener("click", function () {
    let searchPlace = document.getElementById("searchPlace").value;
    let searchDonarlistTemp = document.getElementById("searchDonarlist");
    let searchDonarlist =
      searchDonarlistTemp.options[searchDonarlistTemp.selectedIndex].value;
    let showTable = document.getElementById("table-information");
    let searchOption = {
      Place: searchPlace,
      BloodGroup: searchDonarlist,
    };

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // console.log(this.responseText);
        console.log(tableClearingFlag);
        if (this.responseText != "[]") {
          let tableInformation = JSON.parse(this.responseText);
          console.log ("bject contain data");
          if (tableClearingFlag === true) {
            clearingaTable();
            tableClearingFlag = false;
          }
          showContentTable(tableInformation);
        } else {
          console.log ("bject contain no-data");
          alert("Nothing Matched!. please try first letter capitalized");
          if (tableClearingFlag === true) {
              clearingaTable();
              tableClearingFlag = false;
            }
            // console.log ("bject contain no-data");
            // if (tableClearingFlag === true) {
            //   document.getElementById("table-information").innerHTML = " ";
            //   tableClearingFlag = false;
            // }
            // let pTag = document.createElement("p");
            // let textNode = document.createTextNode(
            //   "Nothing Matched!. please try first letter capitalized"
            // );
            // pTag.appendChild(textNode);
            // showTable.appendChild(pTag);
            // tableClearingFlag = true;
            // console.log(showTable);
            // console.log(tableClearingFlag);
        }
      }
    };

    xhr.open("post", "/findData", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(searchOption));
    console.log(searchOption);
  });

  function showContentTable(tableInformation) {
    console.log(typeof(tableInformation));
    console.log(tableInformation);

    // let firstname = tableInformation[0].FirstName;
    // let lastName = tableInformation[0].LastName;
    // let mobilenumber = tableInformation[0].MobileNumber;
    // console.log(firstname + lastName + mobilenumber);
    let table = document.getElementById("show-table");
    var row = table.insertRow(0);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    cell0.innerHTML = "Name";
    cell1.innerHTML = "Contact Number";
    cell2.innerHTML = "Blood Group";
    tableInformation.forEach(function (item, index, array) {
      // console.log(item);
      row = table.insertRow(index + 1);
      cell0 = row.insertCell(0);
      cell1 = row.insertCell(1);
      cell2 = row.insertCell(2);
      cell0.innerHTML = item.FirstName + " " + item.LastName;
      cell1.innerHTML = item.MobileNumber;
      cell2.innerHTML = item.BloodGroup;
      document.getElementById("table-information").appendChild(table);
    });
    tableClearingFlag = true;
    tableInformation.length = 0;
    console.log(tableClearingFlag);
  }

  function clearingaTable() {
    let table = document.getElementById("show-table");
    let tableRows = document.getElementsByTagName("tr");
    var rowCount = tableRows.length;
    // console.log(tableRows);
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    console.log(table);

  }
});
