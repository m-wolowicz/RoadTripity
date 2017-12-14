$(document).ready(function() {
$('#end').on('click', function(){





// Ajax request based on user's destination value
	var city = $('#end').val()
    $.ajax({
  url : "http://api.wunderground.com/api/4ca026adcc7248b3/geolookup/conditions/forecast/q/" + city + ".json",
  dataType : "jsonp",
  async: false,
  success : function(parsed_json) {
  var temp_f = parsed_json['current_observation']['temp_f'];
  $("#weatherResultsDiv").append("<p>" + "Current temperature in " + city + " is:"  + temp_f + "</p>");
  }
  		}); // end of Ajax call




	}); // end of onclick

}); // end of document.ready