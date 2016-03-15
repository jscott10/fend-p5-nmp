/*! p5 2016-03-15 */
function initMap(){google.maps.visualRefresh=!0,$contentNode=$("#info-window");var a={center:binghamton,zoom:14,mapTypeId:google.maps.MapTypeId.ROADMAP},b=$("#map-div").get(0);map=new google.maps.Map(b,a),infoWindow=new google.maps.InfoWindow({content:$contentNode[0]}),placesService=new google.maps.places.PlacesService(map),getYahooWeather(),null!==localStorage.getItem("placeType")&&(placeType(localStorage.getItem("placeType")),$("#place-type").selectmenu("refresh"),getPlaces())}var map,placesService,markerList=[],currentMarker,infoWindow,$contentNode,binghamton={lat:42.088848,lng:-75.969491},error1,error2,pd,filterMarkers=function(){resetMapMarkers(),addMarkers()},resetMapMarkers=function(){for(var a=0;a<markerList.length;a++)markerList[a].setMap(null),markerList[a]=null;markerList.length=0},getPlaces=function(){resetMapMarkers(),resetFilter();var a={location:binghamton,radius:"2000",types:[placeType()]};localStorage.setItem("placeType",placeType()),placesService.nearbySearch(a,setPlacesList)},resetFilter=function(){filter("")},setPlacesList=function(a,b){searchStatus(b),foundPlaces().length>0&&foundPlaces.removeAll(),b==google.maps.places.PlacesServiceStatus.OK&&(foundPlaces(a),addMarkers())},addMarkers=function(){for(var a=0;a<filteredPlaces().length;a++)addMarker(filteredPlaces()[a],a)},addMarker=function(a,b){var c=new google.maps.Marker({place:{location:a.geometry.location,placeId:a.place_id},title:a.name,icon:{url:getMarkerIcon("inactive",b)},animation:google.maps.Animation.DROP,map:map});c.index=markerList.push(c)-1,c.addListener("click",function(){setCurrentMarker(c)})},triggerInfoWindow=function(a){markerList.length>=filteredPlaces().length&&setCurrentMarker(getCurrentMarker(a))},getCurrentMarker=function(a){for(var b=0;b<markerList.length;b++)if(a===markerList[b].getPlace().placeId)return markerList[b]},setCurrentMarker=function(a){currentMarker&&(currentMarker.setIcon({url:getMarkerIcon("inactive",currentMarker.index)}),currentMarker.setAnimation(null)),currentMarker=a,highlightMarker(currentMarker)},highlightMarker=function(a){a.setZIndex(google.maps.Marker.MAX_ZINDEX+1),a.setIcon({url:getMarkerIcon("active",a.index)}),a.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){a.setAnimation(null),openInfoWindow(a)},1500)},openInfoWindow=function(a){$("#info-window").empty(),$("#info-window").append("<h3 class='load-message'>Loading...</h3>"),infoWindow.open(map,a),placesService.getDetails({placeId:a.getPlace().placeId},function(a,b){b==google.maps.places.PlacesServiceStatus.OK?($(".load-message").remove(),pd=a,displayPlaceInfo(a),displayPlaceInfo.placeBanner(),displayPlaceInfo.allReviews()):$("#info-window").append("<h3 class='no-review-message'>Could not load location info.</h3>")})},displayPlaceInfo=function(a){},getYahooWeather=function(){var a="https://query.yahooapis.com/v1/public/yql",b={q:"select * from weather.forecast where woeid in (select woeid from geo.places(1) where text = 'Binghamton NY')",format:"json",env:"store://datatables.org:alltableswithkeys"};$.getJSON(a,b,function(a){console.log(a);var b=a.query.results.channel,c=b.description,d=b.item.condition,e="<img src='http://l.yimg.com/a/i/us/we/52/"+d.code+".gif'>",f=d.date,g=b.units,h=d.text+", "+d.temp+" "+g.temperature;$(".weather-banner").append("<strong>"+c+"</strong><br>"),$(".weather-banner").append(f+"<br>"),$(".current-conditions").append(e),$(".current-conditions").append("<span class='conditions'><strong>Current Conditions</strong><br>"),$(".current-conditions").append(h+"</span>")}).error(function(){$("#yahoo-weather").remove()})},getMarkerIcon=function(a,b){var c,d="ABCDEFGHIJKLMNOPQRSTUVWXYZ";switch(a){case"active":c="green";break;case"inactive":default:c="pink"}return"img/src/gm-markers/"+c+"_Marker"+d[b]+".png"},formattedDateTime=function(a){var b=new Date(1e3*a),c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],d=b.getFullYear(),e=c[b.getMonth()],f=b.getDate(),g=f+" "+e+" "+d;return g};