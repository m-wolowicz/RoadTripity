//IMPORTANT!
$(document).ready(function() {

// INITIALIZING FIREBASE
// ================

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

// Variables for the past adventures table
   var name = snapshot.val().name;
   var travelersTotal = snapshot.val().travelersTotal;
   var startingPoint = snapshot.val().startingPoint;
   var destination = snapshot.val().destination;
   var arrivalDate = snapshot.val().arrivalDate;
   var tripDuration = snapshot.val().tripDuration;
   var tableRow = $("<tr>");
   var tableDisplay = $("<td>");


// Displays on the past adventures the travelers name.

  tableRow.append(tableDisplay);
  tableDisplay.text(name);

  // displays on the past adventures the starting point
  var tableDisplay3 = $("<td>");
  tableRow.append(tableDisplay3);
  tableDisplay3.text(startingPoint);

// displays on the past adventures the destination
  var tableDisplay4 = $("<td>");
  tableRow.append(tableDisplay4);
  tableDisplay4.text(destination);

  // displays on the past adventures the arrival date
  var tableDisplay5 = $("<td>");
  tableRow.append(tableDisplay5);
  tableDisplay5.text(arrivalDate);

// displays on the past adventures the trip duration
  var tableDisplay6 = $("<td>");
  tableRow.append(tableDisplay6);
  tableDisplay6.text(tripDuration);

  // Displays on the past adventures the total travelers.
  var tableDisplay2 = $("<td>");
  tableRow.append(tableDisplay2);
  tableDisplay2.text(travelersTotal);


// displays on the past adventures the table row
 $("tbody").append(tableRow);


 },

// Part of the firebase
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


// On click statement that collects the users input data.
$('#submit').on('click', function(event){
  event.preventDefault();

 var name = $("#travelerName").val().trim();
 console.log(name);
   var travelersTotal = $("#numberTravelers").val().trim();
   var startingPoint = $("#startingPoint").val().trim();
   var destination = $("#destination").val().trim();
   var arrivalDate = $("#arrivalDate").val().trim();
   var tripDuration = $("#tripDuration").val().trim();


// Lines that push data to the databse.
 database.ref("/adventures").push({
         name: name,
         travelersTotal: travelersTotal,
         startingPoint: startingPoint,
         destination: destination,
         arrivalDate: arrivalDate,
         tripDuration: tripDuration

        });

});


$("#resetButton").on("click", function(event) {
    location.reload(event);

    });

// FUNCTIONS
// =========

//This function gets user input and uses WU API to populate weather recommendations
function weatherRecommendations() {
  //getting destination google place info from input form
  var cityRaw = $('#destination').val();

  //splitting raw city information into an array of strings
  var cityArr = cityRaw.split(',');
  var stIndex = cityArr.length - 2
  var ctIndex = cityArr.length - 3

  var city = cityArr[ctIndex];
  var st = cityArr[stIndex];

      //Save the user's destination choice as a variable
  		var userInputDestination = st + '/' + city;

  		//Create a new variable for the WEATHER API query URL search
  		var queryURL = "http://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast/q/" + userInputDestination + ".json";

  		//AJAX
  		$.ajax({
  			url : queryURL,
  			dataType : "jsonp",
  			success : function(response) {

  				var currentDestinationWeather = "" + response.current_observation.weather + "";

  				console.log(currentDestinationWeather);

  				//Creating arrays for different types of weather
          var rain = [
  							"Drizzle",
  							"Light Drizzle",
  							"Heavy Drizzle",
  							"Rain",
  							"Light Rain",
  							"Heavy Rain",
  							"Spray",
  							"Light Spray",
  							"Heavy Spray",
  							"Rain Mist",
  							"Light Rain Mist",
  							"Heavy Rain Mist",
  							"Rain Showers",
  							"Light Rain Showers",
  							"Heavy Rain Showers",
  							"Thunderstorms and Rain",
  							"Light Thunderstorms and Rain",
  							"Heavy Thunderstorms and Rain",
  							"Freezing Rain",
  							"Light Freezing Rain",
  							"Heavy Freezing Rain",
                "Freezing Drizzle",
                "Light Freezing Drizzle",
                "Heavy Freezing Drizzle"
  				];

  				var snow = [
  							"Snow",
  							"Light Snow",
  							"Heavy Snow",
  							"Snow Grains",
  							"Light Snow Grains",
  							"Heavy Snow Grains",
  							"Low Drifting Snow",
  							"Light Low Drifting Snow",
  							"Heavy Low Drifting Snow",
  							"Blowing Snow",
  							"Light Blowing Snow",
  							"Heavy Blowing Snow",
  							"Snow Showers",
  							"Light Snow Showers",
  							"Heavy Snow Showers",
  							"Snow Blowing Snow Mist",
  							"Light Snow Blowing Snow Mist",
  							"Heavy Snow Blowing Snow Mist",
  							"Thunderstorms and Snow",
  							"Light Thunderstorms and Snow",
  							"Heavy Thunderstorms and Snow"
  				];

  				var ice = [
  							"Ice Crystals",
  							"Light Ice Crystals",
  							"Heavy Ice Crystals",
  							"Ice Pellets",
  							"Light Ice Pellets",
  							"Heavy Ice Pellets",
  							"Hail",
  							"Light Hail",
  							"Heavy Hail",
  							"Ice Pellet Showers",
  							"Light Ice Pellet Showers",
  							"Heavy Ice Pellet Showers",
  							"Hail Showers",
  							"Light Hail Showers",
  							"Heavy Hail Showers",
  							"Small Hail Showers",
  							"Light Small Hail Showers",
  							"Heavy Small Hail Showers",
  							"Thunderstorms and Ice Pellets",
  							"Light Thunderstorms and Ice Pellets",
  							"Heavy Thunderstorms and Ice Pellets",
  							"Thunderstorms with Hail",
  							"Light Thunderstorms with Hail",
  							"Heavy Thunderstorms with Hail",
  							"Thunderstorms with Small Hail",
  							"Small Hail",
  							"Light Thunderstorms with Small Hail",
  							"Heavy Thunderstorms with Small Hail"
  				];

  				var dusty = [
                      "Widespread Dust",
                      "Light Widespread Dust",
                      "Heavy Widespread Dust",
                      "Sand",
                      "Light Sand",
                      "Heavy Sand",
                      "Dust Whirls",
                      "Light Dust Whirls",
                      "Heavy Dust Whirls",
                      "Sandstorm",
                      "Light Sandstorm",
                      "Heavy Sandstorm",
                      "Low Drifting Widespread Dust",
                      "Light Low Drifting Widespread Dust",
                      "Heavy Low Drifting Widespread Dust",
                      "Low Drifting Sand",
                      "Light Low Drifting Sand",
                      "Heavy Low Drifting Sand",
                      "Blowing Widespread Dust",
                      "Light Blowing Widespread Dust",
                      "Heavy Blowing Widespread Dust",
                      "Blowing Widespread Dust",
                      "Light Blowing Widespread Dust",
                      "Heavy Blowing Widespread Dust",
                      "Blowing Sand",
                      "Light Blowing Sand",
                      "Heavy Blowing Sand"
  				];

          var fog = [
                    "Mist",
                    "Light Mist",
                    "Heavy Mist",
                    "Fog",
                    "Light Fog",
                    "Heavy Fog",
                    "Fog Patches",
                    "Light Fog Patches",
                    "Heavy Fog Patches",
                    "Freezing Fog",
                    "Light Freezing Fog",
                    "Heavy Freezing Fog",
                    "Patches of Fog",
                    "Light Patches of Fog",
                    "Heavy Patches of Fog",
                    "Shallow Fog",
                    "Light Shallow Fog",
                    "Heavy Shallow Fog",
                    "Partial Fog"
          ];

          var volcanic = [
                    "Smoke",
                    "Light Smoke",
                    "Heavy Smoke",
                    "Volcanic Ash",
                    "Light Volcanic Ash",
                    "Heavy Volcanic Ash",
                    "Haze",
                    "Light Haze",
                    "Heavy Haze",
          ];

          var cloudy = [
                    "Overcast",
                    "Partly Cloudy",
                    "Mostly Cloudy",
                    "Scattered Clouds"
          ];

          var clear = ["Clear"];
          var thunder = ["Thunderstorm", "Light Thunderstorm", "Heavy Thunderstorm"];
          var severe = ["Squalls", "Funnel Cloud"];
          var unknown = ["Unknown", "Unknown Precipitation"];

          //Creating variables that check if the Current Weather at Destination is part of each array
          var rainTrue = rain.indexOf(currentDestinationWeather) > -1;
          var snowTrue = snow.indexOf(currentDestinationWeather) > -1;
          var iceTrue = ice.indexOf(currentDestinationWeather) > -1;
          var dustyTrue = dusty.indexOf(currentDestinationWeather) > -1;
          var fogTrue = fog.indexOf(currentDestinationWeather) > -1;
          var volcanicTrue = volcanic.indexOf(currentDestinationWeather) > -1;
          var cloudyTrue = cloudy.indexOf(currentDestinationWeather) > -1;
          var clearTrue = clear.indexOf(currentDestinationWeather) > -1;
          var thunderTrue = thunder.indexOf(currentDestinationWeather) > -1;
          var severeTrue = severe.indexOf(currentDestinationWeather) > -1;
          var unknownTrue = unknown.indexOf(currentDestinationWeather) > -1;

  				//Using an else if statement to display different recommendations based on the current weather conditions at the destination city
  				if (rainTrue) {
            //Populate recommendation for Rain in the HTML
            $("#roadTipText").html("Bring and umbrella");

  				} else if (snowTrue) {
            //Populate recommendation for Snow in the HTML
            $("#roadTipText").html("Bring a shovel");

  				} else if (iceTrue) {
            //Populate recommendation for Ice in the HTML
            $("#roadTipText").html("Bring an ice pick");

  				} else if (dustyTrue) {
            //Populate recommendation for Dust and Sand in the HTML
            $("#roadTipText").html("It's raining Sand! Protect yourself!");

          } else if (fogTrue) {
            //Populate recommendation for Fog in the HTML
            $("#roadTipText").html("Turn on your fog lights");

          } else if (volcanicTrue) {
            //Populate recommendation for Volcano and Ash in the HTML
            $("#roadTipText").html("The earth is errupting, be careful");

          } else if (cloudyTrue) {
            //Populate recommendation for Cloudy in the HTML
            $("#roadTipText").html("It's just clouds out there");

          } else if (clearTrue) {
            //Populate recommendation for Clear in the HTML
            $("#roadTipText").html("I can see clearly now the rain is gone");

          } else if (thunderTrue) {
            //Populate recommendation for Thunderstorms in the HTML
            $("#roadTipText").html("Light travels faster than sound, get out of the water!");

          } else if (severeTrue) {
            //Populate recommendation for Severe Conditions in the HTML
            $("#roadTipText").html("Anytime you hear Funnel Cloud or Squalls, sounds like Tornado To Me. Take cover and turn on your weather radio!");

          } else if (unknownTrue) {
            //Populate recommendation for Unknown Weather Conditions in the HTML
            $("#roadTipText").html("That's scary, the weather is unknown. Prepare for the Zombie Apocalipse");

          } else {
            //Populate recommendation for Anything else in the HTML
            $("#roadTipText").html("Well that's odd. We have no weather! ");
  			  } // End If Else Statement
  		} //End function(response)
  	}); //End Ajax
} //End Weather Recommendations Function


// MAIN PROCESS
// ============

//$(document).ready(function() {
$('#submit').on('click', function(event){

  event.preventDefault();

  //Calling weatherRecommendations function
  weatherRecommendations();

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
