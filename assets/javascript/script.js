//IMPORTANT!
$(document).ready(function() {

$("#hideDir").hide();

	$("#showDir").on('click', function(event) {
	event.preventDefault();
	$("#dirDisplay").show();
	$("#dirDisplay").css("display", "block");
	$("#hideDir").show();
	
})

	$("#hideDir").on('click', function(event){
		event.preventDefault();
		$("#hideDir").hide();
		$("#dirDisplay").hide();
		$("#ShowDir").show();
		

	})

// FUNCTIONS
//calendar input restricting to future dates only
var today = new Date().toISOString().split('T')[0];
          document.getElementsByName("somedate")[0].setAttribute('min', today);

//This function gets user input and uses WU API to populate weather conditions
function weatherConditions() {
	//getting destination google place info from input form
  var cityRaw = $('#destination').val();

  //splitting raw city information into an array of strings
  var cityArr = cityRaw.split(',');

  // console.log(cityArr);

 if (cityArr.length < 3) {
 	bootbox.alert({
	   message: "Destination must contain at least 'city, state and country' to display accurate weather results for your trip",
	  size: 'large'
	  });
 } else {

  var stIndex = cityArr.length - 2;
  var ctIndex = cityArr.length - 3;

  var city = cityArr[ctIndex];
  var st = cityArr[stIndex];

// Ajax request based on user's destination value
  //var city = $('#destination').val()
	$.ajax({
  url : "https://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast10day/q/" + st + '/' + city + ".json",
  dataType : "jsonp",
  async: false,
  success : function(response) {
    console.log(response);



  //  Saving the current_observation.icon_url property
		var currentDayImage = (response.current_observation.icon_url).replace(/i\/c\/k/, "i\/c\/i");
		var currentCondition = "<strong>" + response.current_observation.weather + "</strong><br>" + response.current_observation.temp_f + "&#8457";		
		var currentConditionLongText = response.forecast.txt_forecast.forecastday[0].fcttext;
		// Forecast  and image for the first day
		var firstDayForecast = "<strong>" + response.forecast.simpleforecast.forecastday[1].date.weekday + "</strong><br>" + response.forecast.simpleforecast.forecastday[1].conditions + "<br>" + "H " + response.forecast.simpleforecast.forecastday[1].high.fahrenheit + "&#8457 / " + "L " + response.forecast.simpleforecast.forecastday[1].low.fahrenheit + "&#8457";
		var firstDayImage = (response.forecast.simpleforecast.forecastday[1].icon_url).replace(/i\/c\/k/, "i\/c\/i");
		//var firstDayTemp = "H " + response.forecast.simpleforecast.forecastday[1].high.fahrenheit + " / " + "L " + response.forecast.simpleforecast.forecastday[1].low.fahrenheit;
		// Forecast for the second day
		var secondDayForecast = "<strong>" + response.forecast.simpleforecast.forecastday[2].date.weekday + "</strong><br>" + response.forecast.simpleforecast.forecastday[2].conditions + "<br>" + "H " + response.forecast.simpleforecast.forecastday[2].high.fahrenheit + "&#8457 / " + "L " + response.forecast.simpleforecast.forecastday[2].low.fahrenheit + "&#8457";
		var secondDayImage = (response.forecast.simpleforecast.forecastday[2].icon_url).replace(/i\/c\/k/, "i\/c\/i");
		// Forecast for the third day
		var thirdDayForecast = "<strong>" + response.forecast.simpleforecast.forecastday[3].date.weekday + "</strong><br>" + response.forecast.simpleforecast.forecastday[3].conditions + "<br>" + "H " + response.forecast.simpleforecast.forecastday[3].high.fahrenheit + "&#8457 / " + "L " + response.forecast.simpleforecast.forecastday[3].low.fahrenheit + "&#8457";
		var thirdDayImage = (response.forecast.simpleforecast.forecastday[3].icon_url).replace(/i\/c\/k/, "i\/c\/i");


  // Creating and storing an image tag for the current condition
		var currentWeatherImage = $("<img>");

  // Setting the currentWeatherImage src attribute to imageUrl
		 currentWeatherImage.attr("src", currentDayImage);
// Adding alternative text
		currentWeatherImage.attr("alt", "Today's forecast");
		//Adding class
		currentWeatherImage.addClass("currentImg");
// Appending the current image and forecast onto html
   $("#currentConditionImg").html(currentWeatherImage);
   $("#currentConditionTxt").html("<p>The current weather condition in the city of " + city + " is: <br>" + currentCondition + "</p>" );
   $("#currConditionLongTxt").html("<p>" + currentConditionLongText + "</p>")

// Creating and storing an image tag for the
	  var firstWeatherImage = $("<img>");

  // Setting the currentWeatherImage src attribute to imageUrl
		firstWeatherImage.attr("src", firstDayImage);
// Adding alternative text
		firstWeatherImage.attr("alt", "Today's forecast");
		//Adding class
		firstWeatherImage.addClass("weatherImgs");

// Appending first image and forecast onto html
$("#imgFDay1").html(firstWeatherImage);
$("#txtFDay1").html(firstDayForecast);
// Appending second image and forecast onto html
// Creating and storing an image tag for the
	  var secondWeatherImage = $("<img>");

  // Setting the currentWeatherImage src attribute to imageUrl
		secondWeatherImage.attr("src", secondDayImage);
// Adding alternative text
		secondWeatherImage.attr("alt", "Today's forecast");
		//Adding class
		secondWeatherImage.addClass("weatherImgs");

$("#imgFDay2").html(secondWeatherImage);
$("#txtFDay2").html(secondDayForecast);
// Apeending third image and forecast onto html
  var thirdWeatherImage = $("<img>");

  // Setting the currentWeatherImage src attribute to imageUrl
		thirdWeatherImage.attr("src", thirdDayImage);
// Adding alternative text
		thirdWeatherImage.attr("alt", "Today's forecast");
		//Adding class
		thirdWeatherImage.addClass("weatherImgs");

$("#imgFDay3").html(thirdWeatherImage);
$("#txtFDay3").html(thirdDayForecast);

  }
	  }); // end of Ajax call
  
} //End weather conditions function 
}


//This function gets user input and uses WU API to populate weather recommendations
function weatherRecommendations() {

	//getting destination google place info from input form
	var cityRaw = $('#destination').val();

	//splitting raw city information into an array of strings
	var cityArr = cityRaw.split(',');
	var stIndex = cityArr.length - 2;
	var ctIndex = cityArr.length - 3;

	var city = cityArr[ctIndex];
	var st = cityArr[stIndex];
	console.log(city);
	console.log(st);

	//Save the user's destination choice as a variable
	var userInputDestination = st + '/' + city;

	//Create a new variable for the WEATHER API query URL search
	var queryURL = "https://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast/q/" + userInputDestination + ".json";

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
			$("#roadTipText").html("<img src='assets/images/animated/rainy-6.svg' alt='Rain Icon'><br> Consider packing umbrellas, ponchos, rain boots and rain coats. Check your car's wiper blades, your tires' thread depth, lights, and emergency kit.");

		  } else if (snowTrue) {
			//Populate recommendation for Snow in the HTML
			$("#roadTipText").html("<img src='assets/images/animated/snowy-4.svg' alt='Snow Icon'><br> Consider packing extra socks, heavy winter coats, snow boots, and a shovel. Check that your tires are properly inflated, keep your gas tank at least half full to avoid gas line freeze-up.");

		  } else if (iceTrue) {
			//Populate recommendation for Ice in the HTML
			$("#roadTipText").html("<img src='assets/images/animated/snowy-6.svg' alt='Ice Icon'><br> Consider packing hats and helmets to protect your head, as well as snow boots and an ice pick. Remember bridges freeze before roads, and drive in the tire tracks of other vehicles as there will be more traction in these areas");

		  } else if (dustyTrue) {
			//Populate recommendation for Dust and Sand in the HTML
			$("#roadTipText").html("Consider packing a scarf, filter masks for breathing, and proper eyewear to shield your eyes from the dust. Drive slowly, leaving enough distance between you and other cars and eep your headlights on, using low beams.");

		  } else if (fogTrue) {
			//Populate recommendation for Fog in the HTML
			$("#roadTipText").html("Remember to pack you glasses and contacts, as well as flashlights. While driving, slow down, use low-beam headlights, and use fog lights.");

		  } else if (volcanicTrue) {
			//Populate recommendation for Volcano and Ash in the HTML
			$("#roadTipText").html("There is volcanic activity nearby. Stay outside the exclusion zones around the crater. Volcanic smoke, ash and haze may affect your health and roat trip plans.");

		  } else if (cloudyTrue) {
			//Populate recommendation for Cloudy in the HTML
			$("#roadTipText").html("<img src='assets/images/animated/cloudy.svg' alt='Cloudy Icon'><br> Consider wearing SPF protection even when it's cloudy outside. Clouds usually bring rain with them, bring your umbrella just in case.");

		  } else if (clearTrue) {
			//Populate recommendation for Clear in the HTML
			$("#roadTipText").html("<img src='assets/images/animated/day.svg' alt='Clear Icon'><br> I can see clearly now the rain is gone! The skies are clear, go out and enjoy the road... but remember to protect your sking from the sun!");

		  } else if (thunderTrue) {
			//Populate recommendation for Thunderstorms in the HTML
			$("#roadTipText").html("<img src='assets/images/animated/thunder.svg' alt='Thunder Icon'><br> Consider pakcing a Disaster Supplies Kit in your trunk. Avoid touching metal or other surfaces that conduct electricity in and outside the vehicle.");

		  } else if (severeTrue) {
			//Populate recommendation for Severe Conditions in the HTML
			$("#roadTipText").html("Anytime you hear Funnel Cloud or Squalls, a Tornado might not be far behind. Consider pulling over at the nearest stop, taking cover and turning on your weather radio!");

		  } else if (unknownTrue) {
			//Populate recommendation for Unknown Weather Conditions in the HTML
			$("#roadTipText").html("That's scary, the weather is unknown. Prepare for the Zombie Apocalipse.  MREs, guns and ammo are highly recommended!");

		  } else {
			//Populate recommendation for Anything else in the HTML
			$("#roadTipText").html("Well that's odd. We have no weather!");
		  } // End If Else Statement
	  } //End function(response)
	}); //End Ajax
} //End Weather Recommendations Function


	//Pulling the user's input into the database
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
       var content =  { 
         id: snapshot.key,
         name: snapshot.val().name, 
         travelersTotal: snapshot.val().travelersTotal, 
         startingPoint: snapshot.val().startingPoint,  
         destination: snapshot.val().destination,
         arrivalDate: snapshot.val().arrivalDate, 
         tripDuration: snapshot.val().tripDuration 

         }

   displayTable(content);

   
   },  function(errorObject) {
      console.log("The read failed: " + errorObject.code);
  })
	

	// Displaying adventures tables 
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
  var removeButton= $("<td><button type='button' class='removeme btn btn-xs deleteButton' id='removeEntryButton'>REMOVE</button></td>");
  removeButton.on("click", function(){
  })

  tableRow.append(removeButton);

// displays on the past adventures the table row 
 $("tbody").append(tableRow); 

 tableRow.data("dataInfo", content);

// Lines that push data to the databse. 

}






//This function calculates and provides gas cost
	
// function gasCostCalculator() {

// 	var westObj = {
// 		states: ["AK", "AZ", "CA", "HI", "NV", "OR", "WA"],
// 		coastId: "R50"
// 	} 
// 	var eastObj = {
// 		states: ["CT", "DC", "DE", "FL", "GA", "MA", "MD","ME", "NC", "NH", "NJ", "NY", "PA", "RI", "SC", "VA", "VT", "WV"],
// 		coastId: "R10"
// 	}
// 	var midObj = {
// 		states: ["IA", "IL", "IN", "KS", "KY", "MI", "MN", "MO", "ND", "NE", "OH", "OK", "SD", "TN", "WI"],
// 		coastId: "R20"
// 	}
// 	var gulfObj = {
// 		states: ["AL", "AR", "LA", "MS", "NM", "TX"],
// 		coastId: "R30"
// 	}
// 	var rockObj = {
// 		states: ["CO", "ID", "MT", "UT", "WY"],
// 		coastId: "R40"
// 	}
// console.log(eastObj.states);
// 	var dgasStRaw = $('#destination').val();
// 	console.log(dgasStRaw);
//   	var dgasStArr = dgasStRaw.split(',');
//   	var dgasStIndex = dgasStArr.length - 2;
//   	console.log(dgasStArr[dgasStIndex]);
//   	var dgasSt =  String(dgasStArr[dgasStIndex].trim());
// 	   console.log(dgasSt);

//  	var ogasStRaw = $('#startingPoint').val();
//   	var ogasStArr = ogasStRaw.split(',');
//   	var ogasStIndex = ogasStArr.length - 2;
//    	var ogasSt = String(ogasStArr[ogasStIndex].trim());
//   		console.log(ogasSt);

//   	var testArr = [dgasSt, ogasSt];
//   	console.log(testArr);
  	
//   	if (westObj.states.indexOf(dgasSt) > -1) {
//   		var areaIdone = westObj.coastId;
  		
//   	} else if (eastObj.states.indexOf(dgasSt) > -1) {
//   		var areaIdone = eastObj.coastId;
  		
//   		} else if (gulfObj.states.indexOf(dgasSt) > -1) {
//   			var areaIdone = gulfObj.coastId;
  			
//   			} else if (rockObj.states.indexOf(dgasSt) > -1) {
//   				var areaIdone = rockObj.coastId;
  				
//   				} else if (midObj.states.indexOf(dgasSt) > -1) {
//   				var areaIdone = midObj.coastId; 	
  					
//   					} else {
//   						bootbox.alert({
// 	  					 message: "Sorry we could not provide gas cost for this trip. It appears that updates current gas prices are not available for part of the areas you are driving to..",
// 	  					size: 'large'
// 	 					 });
//   					}
//   					console.log(areaIdone);
//   	if (westObj.states.indexOf(ogasSt) > -1) {
//   		var areaIdtwo = westObj.coastId;
  		
//   	} else if (eastObj.states.indexOf(ogasSt) > -1) {
//   		var areaIdtwo = eastObj.coastId;
  		
//   		} else if (gulfObj.states.indexOf(ogasSt) > -1) {
//   			var areaIdtwo = gulfObj.coastId;
  			
//   			} else if (rockObj.states.indexOf(ogasSt) > -1) {
//   				var areaIdtwo = rockObj.coastId;
  				
//   				} else if (midObj.states.indexOf(ogasSt) > -1) {
//   				var areaIdtwo = midObj.coastId; 	
  					
//   					} else {
//   						bootbox.alert({
// 	  					 message: "Sorry we could not provide gas cost for this trip. It appears that updates current gas prices are not available for part of the areas you are driving to..",
// 	  					size: 'large'
// 	 					 });
//   					}
//   					console.log(areaIdtwo);
  			
//   			queryURLone = "https://api.eia.gov/series/?api_key=8516f1b4fbf04660a155352d9d29ab82&series_id=PET.EMM_EPM0_PTE_" + areaIdone + "_DPG.W"
//   			queryURLtwo = "https://api.eia.gov/series/?api_key=8516f1b4fbf04660a155352d9d29ab82&series_id=PET.EMM_EPM0_PTE_" + areaIdtwo + "_DPG.W"
  			
  			
//   			$.ajax({url: queryURLone, method: "GET"})
//         	.done(function(response) {
        		
//         		var dgasPrice = parseFloat(response.series[0].data[1][1]);
//         		console.log(dgasPrice);
        		
        	

//         			$.ajax({url: queryURLtwo, method: "GET"})
//         			.done(function(response) {
//         				var ogasPrice = parseFloat(response.series[0].data[1][1]);
//         				console.log(ogasPrice);
        		
        	

//         	var avggasPrice = ((dgasPrice + ogasPrice) / 2).toFixed(2);
//         	console.log(avggasPrice);



//         	$("#gasPriceResults").html("<p> Estimated Gas Expense:<strong>" + gasCostone + "</strong></p>");

//         	})
// })
// }


// MAIN PROCESS
// ============

	//On click event for the SUBMIT BUTTON that activates the entire process
	$('#submit').on('click', function(event){

		// This prevents the form from trying to submit itself and reseting the page.
		event.preventDefault();

  // Variables for the past adventures table 

    var name = $("#travelerName").val().trim();
    var travelersTotal = $("#numberTravelers").val().trim();
    var startingPoint = $("#startingPoint").val().trim(); 
    var destination = $("#destination").val().trim(); 


    var arrivalDate = $("#arrivalDate").val().trim(); 
    var tripDuration = $("#tripDuration").val().trim();    
    var cityRaw = destination;

   //splitting raw city information into an array of strings
   var cityArr = cityRaw.split(",");
   var stIndex = cityArr.length - 2;
   var ctIndex = cityArr.length - 3;

   var city = cityArr[ctIndex];
   var st = cityArr[stIndex];    

    var content =  { 
       name: name, 
       travelersTotal: travelersTotal, 
       startingPoint: city+ ", "+st,  
       destination: city+ ", "+st,
       arrivalDate: arrivalDate, 
       tripDuration: tripDuration 

       }

    database.ref("/adventures").push(content);


		//Calling weatherConditions function
		weatherConditions();

		//Calling weatherRecommendations function
		weatherRecommendations();

		//gasCostCalculator();

		//Calling the populatePastAdventures function
		//populatePastAdventures();

	});	// End Of On Click Event


	//On click event for the RESET BUTTON 
	$("#resetButton").on("click", function(event) {

		//Reload the entire page:
		location.reload(event);

	}); // End Of On Click Event

	$('tbody').on('click', ".deleteButton", function(e){

		var tableRow = $(this).parent().parent(); 

		var dataObject = tableRow.data('dataInfo');
		console.log(dataObject);

		database.ref("/adventures/" + dataObject.id).remove();

		tableRow.remove();

	})


}); //IMPORTANT! End of Document.Ready

	
