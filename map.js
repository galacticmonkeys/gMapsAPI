var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var ClickTime = new google.maps.LatLng(37.78564, -122.39712);
var infowindow;
var waypts = [];

function initialize() {
	var startMarker, mapOptions, coffeeLocation, donutLocation, coffeeRequest, donutRequest, searchService;

	mapOptions = {
		zoom: 16,
		center: ClickTime
	};

	coffeeRequest = {
		location: ClickTime,
		keyword: "coffee",
		rankBy: google.maps.places.RankBy.PROMINENCE,
		types: ['cafe' , 'food' , 'meal_takeaway' , 'meal_delivery'],
		radius: 2000
	} 

	donutRequest = {
		location: ClickTime,
		keyword: "donuts",
		rankBy: google.maps.places.RankBy.PROMINENCE,
		types: ['cafe' , 'food' , 'meal_takeaway' , 'meal_delivery'],
		radius: 2000
	}
	

	infowindow = new google.maps.InfoWindow();
	directionsDisplay = new google.maps.DirectionsRenderer();
 	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 	startMarker = new google.maps.Marker({map: map, position: ClickTime});
 	directionsDisplay.setPanel(document.getElementById('directions-panel'));
 	directionsDisplay.setMap(map);

 	google.maps.event.addListener(startMarker, 'click', function() {
	    infowindow.setContent("ClickTime");
	    infowindow.open(map, this);
  	});

	searchService = new google.maps.places.PlacesService(map);

	searchService.nearbySearch(coffeeRequest, function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		    coffeeLocation = results[0].vicinity;
		    waypts.push({location: coffeeLocation, stopover: true});
     	} else {
 			alert('Uh oh, I couldnt find a coffee shop because ' + status);
 		}
	});

	searchService.nearbySearch(donutRequest, function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		    donutLocation = results[0].vicinity;
		 	waypts.push({location: donutLocation, stopover: true});
     	} else {
 			alert('Uh oh, I couldnt find a donut shop because ' + status);
 		}
	}); 	
}

function calcRoute(start) {
	var start, startString, selectedMode, request;
	start = document.getElementById("address").value;
	startString = String(start);
	selectedMode = document.getElementById('mode').value;

	request = {
		origin: startString,
		destination: String("282 2nd Street 4th floor, San Francisco, CA 94105"),
		travelMode: google.maps.TravelMode[selectedMode],
		waypoints: waypts,
		optimizeWaypoints: true,
		provideRouteAlternatives: true,
	};

	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		    directionsDisplay.setDirections(response);
    		document.getElementById("directions-panel").style.display = "block";
		} else if(google.maps.DirectionsStatus.ZERO_RESULTS && selectedMode == "TRANSIT") {
			alert('The API doesnt currently support waypoints for transit directions.');
			document.getElementById("directions-panel").style.display = "none";
		} else {
			alert('Looks like something went wrong because ' + status);
			document.getElementById("directions-panel").style.display = "none";
		}
	});
}

google.maps.event.addDomListener(window,'load', initialize);
