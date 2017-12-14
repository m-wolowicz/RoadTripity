$(document).ready(function() {
$('#end').on('click', function(){





// Ajax request based on user's destination value
	var city = $('#end').val()
    $.ajax({
  url : "http://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast/q/" + city + ".json",
  dataType : "jsonp",
  async: false,
  success : function(parsed_json) {
  var condition = parsed_json.current_observation.icon

  // Saving the current_observation.icon_url property
        var imageUrl = parsed_json.current_observation.icon_url

        // Creating and storing an image tag
        var weatherImage = $("<img>");

        // Setting the weatherImage src attribute to imageUrl
        weatherImage.attr("src", imageUrl);
        weatherImage.attr("alt", "Today's forecast");

  $("#weatherResultsDiv").append("<p>" + "Current condition in " + city + "is:" + condition + "</p>");


  $("#weatherResultsDiv").append(weatherImage);
  }
  		}); // end of Ajax call




	}); // end of onclick

}); // end of document.ready