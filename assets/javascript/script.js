
$(document).ready(function() {
  var content;

   
// Initializing Firebase 
  var config = {
    apiKey: "AIzaSyAcG4BqNXIOen6kziVMAtUmB21__n2e7JY",
    authDomain: "project1-group5.firebaseapp.com",
    databaseURL: "https://project1-group5.firebaseio.com",
    projectId: "project1-group5",
    storageBucket: "project1-group5.appspot.com",
    messagingSenderId: "448115174573"
  };
  firebase.initializeApp(config);


var database = firebase.database();

//  pulling the info inputted from the user into the database

database.ref("/adventures").on("child_added", function(snapshot) {
   
    var cityRaw = snapshot.val().destination;

     //splitting raw city information into an array of strings
     var cityArr = cityRaw.split(",");
     var stIndex = cityArr.length - 2;
     var ctIndex = cityArr.length - 3;

     var city = cityArr[ctIndex];
     var st = cityArr[stIndex];
// Variables for the past adventures table 
    content =  { 
         name: snapshot.val().name, 
         travelersTotal: snapshot.val().travelersTotal, 
         startingPoint: city+ ", "+st,  
         destination: city+ ", "+st,
         arrivalDate: snapshot.val().arrivalDate, 
         tripDuration: snapshot.val().tripDuration, 

         }

  console.log(content);
   displayTable(content);
   },  function(errorObject) {
      console.log("The read failed: " + errorObject.code);
  })






// On click statement that collects the users input data. 
$('#submit').on('click', function(event){
  event.preventDefault();
  // Variables for the past adventures table 

    name = $("#travelerName").val().trim();
    travelersTotal = $("#numberTravelers").val().trim();
    startingPoint = $("#startingPoint").val().trim(); 
    destination = $("#destination").val().trim(); 


    arrivalDate = $("#arrivalDate").val().trim(); 
    tripDuration = $("#tripDuration").val().trim();    
    tableRow = $("<tr>");


displayTable();
}); 


var displayTable = function(content){

   var tableDisplay = $("<td>");
   var tableRow = $("<tr>");
// Displays on the past adventures the travelers name.  

  tableRow.append(tableDisplay);
  tableDisplay.text(content.name);

  // displays on the past adventures the starting point 
  var tableDisplay3 = $("<td>"); 
  tableRow.append(tableDisplay3); 
  tableDisplay3.text(content.startingPoint);

// displays on the past adventures the destination 
  var tableDisplay4 = $("<td>"); 
  tableRow.append(tableDisplay4); 
  tableDisplay4.text(content.destination);

  // displays on the past adventures the arrival date 
  var tableDisplay5 = $("<td>"); 
  tableRow.append(tableDisplay5); 
  tableDisplay5.text(content.arrivalDate);  

// displays on the past adventures the trip duration 
  var tableDisplay6 = $("<td>"); 
  tableRow.append(tableDisplay6);
  tableDisplay6.text(content.tripDuration);

  // Displays on the past adventures the total travelers.  
  var tableDisplay2 = $("<td>");
  tableRow.append(tableDisplay2);
  tableDisplay2.text(content.travelersTotal); 

// Displays button 
  var removeButton= $("<button id='Yomama'><p>Remove<p></button>");
  tableRow.append(removeButton);

// displays on the past adventures the table row 
 $("tbody").append(tableRow); 



          // database.ref("/adventures").push(content);

// Lines that push data to the databse. 

}





$("#resetButton").on("click", function(event) {
    location.reload(event);
 
    });


//$(document).ready(function() {
$('#submit').on('click', function(event){
  
  event.preventDefault();
  
  //getting destination google place info from input form
  var cityRaw = $('#destination').val();

  //splitting raw city information into an array of strings
  var cityArr = cityRaw.split(',');

  console.log(cityArr);

  var stIndex = cityArr.length - 2
  var ctIndex = cityArr.length - 3

  var city = cityArr[ctIndex];
  var st = cityArr[stIndex];

// Ajax request based on user's destination value
	//var city = $('#destination').val()
    $.ajax({
  url : "http://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast10day/q/" + st + '/' + city + ".json",
  dataType : "jsonp",
  async: false,
  success : function(parsed_json) {
   console.log(parsed_json);


  // var condition = parsed_json.current_observation.icon

  // // Saving the current_observation.icon_url property
  //       var imageUrl = parsed_json.current_observation.icon_url

  //       // Creating and storing an image tag
  //       var weatherImage = $("<img>");

  //       // Setting the weatherImage src attribute to imageUrl
  //       weatherImage.attr("src", imageUrl);
  //       weatherImage.attr("alt", "Today's forecast");

  // $("#weatherResultsDiv").append("<p>" + "Current condition in " + city + "is:" + condition + "</p>");


  // $("#weatherResultsDiv").append(weatherImage);
  }
  		}); // end of Ajax call



 
	}); // end of onclick

}); // end of document.ready