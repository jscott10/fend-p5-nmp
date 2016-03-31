/*! p5 2016-03-31 */
var viewModel=function(){var a=this;a.placeTypes=[{type:"airport",name:"Airports"},{type:"aquarium",name:"Aquariums"},{type:"art_gallery",name:"Art Galleries"},{type:"atm",name:"ATMs"},{type:"bakery",name:"Bakeries"},{type:"bank",name:"Banks"},{type:"bar",name:"Bars"},{type:"beauty_salon",name:"Beauty Salons"},{type:"book_store",name:"Book Stores"},{type:"bus_station",name:"Bus Stations"},{type:"cafe",name:"Cafes"},{type:"car_repair",name:"Car Repair"},{type:"convenience_store",name:"Convenience Stores"},{type:"department_store",name:"Department Stores"},{type:"meal_delivery",name:"Food (Delivery)"},{type:"meal_takeaway",name:"Food (Takeout)"},{type:"gym",name:"Gyms"},{type:"lodging",name:"Hotels/Lodging"},{type:"laundry",name:"Laundry/Dry Cleaning"},{type:"library",name:"Libraries"},{type:"liquor_store",name:"Liquor Stores"},{type:"movie_theater",name:"Movie Theaters"},{type:"museum",name:"Museums"},{type:"night_club",name:"Night Clubs"},{type:"park",name:"Parks"},{type:"restaurant",name:"Restaurants"},{type:"shopping_mall",name:"Shopping Malls"},{type:"store",name:"Stores"},{type:"grocery_or_supermarket",name:"Supermarkets/Grocery Stores"},{type:"train_station",name:"Train Stations"},{type:"zoo",name:"Zoos"}],a.foundPlaces=ko.observableArray(),a.placeType=ko.observable(),a.locationFilter=ko.observable(),a.filteredPlaces=ko.computed(function(){var b;if(void 0===a.locationFilter())b=a.foundPlaces();else{var c=a.locationFilter().toLowerCase();b=ko.utils.arrayFilter(a.foundPlaces(),function(a){return-1!==a.name.toLowerCase().indexOf(c)})}return b.sort(function(a,b){return a.name==b.name?0:a.name<b.name?-1:1})}),a.searchStatus=ko.observable(),a.statusText=ko.computed(function(){switch(a.searchStatus()){case void 0:return"Please select a location type from the list";case google.maps.places.PlacesServiceStatus.OK:var b=1===a.filteredPlaces().length?"Location":"Locations";return"Found "+a.filteredPlaces().length+" "+b;case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:return"No Locations found";case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:return"An error has occurred. Please try again.";default:return"Unspecified Error"}}),a.panelVisible=ko.observable(!0),a.triggerInfoWindow=function(b){markerList.length>=a.filteredPlaces().length&&($("#mypanel").panel("close"),setCurrentMarker(getCurrentMarker(b)))},a.getPlaces=function(){resetMapMarkers(),a.locationFilter();var b={location:binghamton,radius:"2000",types:[a.placeType()]};localStorage.setItem("placeType",a.placeType()),placesService.nearbySearch(b,setPlacesList)},a.filterMarkers=function(){resetMapMarkers(),addMarkers()},a.googlePlaceDetails=ko.observable(),a.googlePlaceDetails.extend({notify:"always"}),a.infoWindowContent=ko.computed(function(){var b="";return void 0!==a.googlePlaceDetails()&&(null===a.googlePlaceDetails()?b="<h3 class='no-review-message'>Could not load location info.</h3>":(b+=a.infoWindowBannerHTML(),b+="<h2>Reviews</h2>",b+=a.infoWindowGoogleReviews())),b}),a.infoWindowContent.extend({notify:"always"}),a.infoWindowBannerHTML=ko.computed(function(){if(void 0!==a.googlePlaceDetails()){var b=a.googlePlaceDetails(),c="<div class='info-banner' class='clearfix'>";if(void 0!==b.photos){var d=b.photos[0].getUrl({maxWidth:100});c+="<img src='"+d+"' class='place-image'>"}return void 0!==b.name&&(c+="<h1>"+b.name+"</h1>"),void 0!==b.formatted_address&&(c+="<p>"+b.formatted_address+"</p>"),void 0!==b.formatted_phone_number&&(c+="<p>"+b.formatted_phone_number+"</p>"),c+="</div>"}}),a.infoWindowGoogleReviews=ko.computed(function(){if(void 0!==a.googlePlaceDetails()){var b=a.googlePlaceDetails().reviews,c="<div class='google-reviews'>";if(c+="<h3>Google</h3>",void 0!==b&&b.length>0){var d=function(){return b.sort(function(a,b){return a.time==b.time?0:a.time>b.time?-1:1})};c+="<ul>";for(var e=d().length<4?d().length:4,f=0;e>f;f++)if(d()[f].text){var g=d()[f].text,h=d()[f].time;c+="<li>"+g+" ("+formattedDateTime(h)+")</li>"}}else c+="<p class='no-review-message'>No reviews found.</p>";return c+="</div>"}}),a.infoWindowContent.subscribe(function(a){infoWindow.open(map,currentMarker)}),a.yahooWeatherResult=ko.observable(),a.yahooWeatherContent=ko.computed(function(){if(void 0!==a.yahooWeatherResult()){if(null===a.yahooWeatherResult().query.results)return"<div class='weather-banner'>Weather data not available</div>";var b=a.yahooWeatherResult().query.results.channel,c=b.description,d=b.item.condition,e=d.date,f=b.units,g=d.text+", "+d.temp+" "+f.temperature,h="<strong>"+c+"</strong><br>",i="<img src='http://l.yimg.com/a/i/us/we/52/"+d.code+".gif'>",j="<span class='banner'>Current Conditions</span><br>",k="<span class='text'>"+g+"</span>",l="<div class='weather-banner'>"+h+e+"</div>",m="<div class='current-conditions'>"+i+j+k+"</div>";return l+m}})};