// viewModel.js

var viewModel = function() {

	var self = this;

	// Google Place Types and associated display text
	self.placeTypes = [
		{type: "airport", name: "Airports"},
		{type: "aquarium", name: "Aquariums"},
		{type: "art_gallery", name: "Art Galleries"},
		{type: "atm", name: "ATMs"},
		{type: "bakery", name: "Bakeries"},
		{type: "bank", name: "Banks"},
		{type: "bar", name: "Bars"},
		{type: "beauty_salon", name: "Beauty Salons"},
		{type: "book_store", name: "Book Stores"},
		{type: "bus_station", name: "Bus Stations"},
		{type: "cafe", name: "Cafes"},
		{type: "car_repair", name: "Car Repair"},
		{type: "convenience_store", name: "Convenience Stores"},
		{type: "department_store", name: "Department Stores"},
		{type: "meal_delivery", name: "Food (Delivery)"},
		{type: "meal_takeaway", name: "Food (Takeout)"},
		{type: "gym", name: "Gyms"},
		{type: "lodging", name: "Hotels/Lodging"},
		{type: "laundry", name: "Laundry/Dry Cleaning"},
		{type: "library", name: "Libraries"},
		{type: "liquor_store", name: "Liquor Stores"},
		{type: "movie_theater", name: "Movie Theaters"},
		{type: "museum", name: "Museums"},
		{type: "night_club", name: "Night Clubs"},
		{type: "park", name: "Parks"},
		{type: "restaurant", name: "Restaurants"},
		{type: "shopping_mall", name: "Shopping Malls"},
		{type: "store", name: "Stores"},
		{type: "grocery_or_supermarket", name: "Supermarkets/Grocery Stores"},
		{type: "train_station", name: "Train Stations"},
		{type: "zoo", name: "Zoos"}
	];

	// list of found places
	self.foundPlaces = ko.observableArray();

	// the selected place Type
	self.placeType = ko.observable();

	// found places filter
	self.locationFilter = ko.observable();

	// Filter the list of found places and sort by name
	// This is the list that is displayed in the Locations Panel
	self.filteredPlaces = ko.computed(function() {
		var unsortedPlaces;
		if(self.locationFilter() === undefined) {
			unsortedPlaces = self.foundPlaces();
		}
		else {
			var filter = self.locationFilter().toLowerCase();
			unsortedPlaces = ko.utils.arrayFilter(self.foundPlaces(), function(place) {
				return place.name.toLowerCase().indexOf(filter) !== -1;
			});
		}
		return unsortedPlaces.sort(function(place1, place2) {
			return place1.name == place2.name ? 0 : (place1.name < place2.name ? -1 : 1);
		});
	});

	// Status returned by Google Maps API
	self.searchStatus = ko.observable();

	// Result messages from Google placesSearch
	self.statusText = ko.computed(function() {
		switch(self.searchStatus()) {
			case undefined:
				return "Please select a location type from the list";
			case google.maps.places.PlacesServiceStatus.OK:
				var locationsText = self.filteredPlaces().length === 1 ? "Location" : "Locations";
				return "Found "+self.filteredPlaces().length+" "+locationsText;
			case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
				return "No Locations found";
			case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
				return "An error has occurred. Please try again.";
			default:
				return "Unspecified Error";
		}
	});

	self.panelVisible = ko.observable(true);

	// Set the current marker when an item on the filtered list is clicked
	self.triggerInfoWindow = function(place_id) {
		if(markerList.length >= self.filteredPlaces().length) {
			$("#mypanel").panel("close");
			setCurrentMarker(getCurrentMarker(place_id));
		}
	};

	// Remove visible markers, reset filter and get new list of Places
	self.getPlaces = function() {
		resetMapMarkers();
		self.locationFilter(); // Reset location filter
		// Get the array of places
		var request = {
			location: binghamton,
			radius: '2000',
			types: [self.placeType()]
		};
		localStorage.setItem("placeType", self.placeType());
		placesService.nearbySearch(request, setPlacesList);
	};

	// Called when text is changed in filter text box
	// Remove visible markers and add markers based on filtered list
	self.filterMarkers = function() {
		resetMapMarkers();
		addMarkers();
	};

	self.yahooWeatherResult = ko.observable();

	self.yahooWeatherContent = ko.computed(function() {
		if(self.yahooWeatherResult() !== undefined) {
			var channel = self.yahooWeatherResult().query.results.channel;
			var description = channel.description;
			var condition = channel.item.condition;
			var date = condition.date;
			var units = channel.units;
			var currentConditions = condition.text + ", " + condition.temp + " " + units.temperature;

			var htmlDescription = "<strong>"+description + "</strong><br>";
			var htmlImage = "<img src='http://l.yimg.com/a/i/us/we/52/"+condition.code+".gif'>";
			var htmlCurrentConditionsBanner = "<span class='banner'>Current Conditions</span><br>";
			var htmlCurrentConditions = "<span class='text'>"+currentConditions+"</span>";

			var htmlWeatherBannerDiv = "<div class='weather-banner'>" + htmlDescription + date + "</div>";
			var htmlCurrentConditionsDiv = "<div class='current-conditions'>" + htmlImage + htmlCurrentConditionsBanner + htmlCurrentConditions + "</div>";

			return htmlWeatherBannerDiv + htmlCurrentConditionsDiv;
		}
	});

};

