$(document).ready(function() {
$('#submit').on('click', function(){
 // this prevents form from reseting after clicking submit

  event.preventDefault();
// Ajax request based on user's destination value
 var userInputDestination = $("#destination").val();

      console.log("The user's destination is:" + userInputDestination);

      function renderImage(){

        $("#weatherResultsDiv").empty();

        // 

      }

    
    //Create a new variable for the WEATHER API query URL search
    var queryURL = "http://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast/q/" + userInputDestination + ".json";

    //AJAX
    $.ajax({
      url : queryURL,
      dataType : "jsonp",
      success : function(response) {
        console.log(response);
      }
    });
  
        // Creating and storing an image tag
        var weatherImage = $("<img>");

        // Setting the weatherImage src attribute to imageUrl
        weatherImage.attr("src");
        weatherImage.attr("alt", "Today's forecast");


  $("#weatherResultsDiv").append(weatherImage);
// this will prevent more than one image to be appended to the page
    renderImage();
// I NEED A RENDER BUTTON FUNCTION TO STOP IT FROM APPEDING CONTINUOUSLY 



	}); // end of onclick


}); // end of document.ready