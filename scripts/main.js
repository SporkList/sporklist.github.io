var position = null;
var googlePlaceReq = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
var googleGeoReq = "https://maps.googleapis.com/maps/api/geocode/json";
var googleAPIkey = "?key=AIzaSyDjI5DwNn9q_yDdi4_-jqv0V4aIjsr39oc";
var googleRadius = "&radius=8000";
var placeTypes = "&types=restaurant|meal_delivery|meal_takeaway|cafe";

/* In the case of no location name, we use the user's current location */
function retrieveSearchResults() {
    var term = "&keyword=" + $("#search-bar").val();
    var loc = "&location=" + position.latitude + "," + position.longitude;
    $.get(googlePlaceReq + googleAPIkey + googleRadius + placeTypes + loc + term, displaySearchResults);
}

/* In the case of using a location name, we need to look up the geocode */
function lookupLocationComplete(data) {
    lookupResults = JSON && JSON.parse(data) || $.parseJSON(data);
    if(lookupResults.status != "OK") {
        alert("Failed to perform search because: " + lookupResults.status);
        return;
    }
    var term = "&keyword=" + $("#search-bar").val();
    var loc = "&location=" + lookupResults.results.geometry.location.lat + "," + lookupResults.results.geometry.location.lng;
    $.get(googlePlaceReq + googleAPIkey + googleRadius + placeTypes + loc + term, displaySearchResults);
}


/* Callback that FINALLY has our search results */
function displaySearchResults(data) {
    searchResults = JSON && JSON.parse(data) || $.parseJSON(data);
    if(searchResults.status != "OK") {
        alert("Failed to perform search because: " + searchResults.status);
        return;
    }
    
    updateSearchResults(searchResults);
}

/* Hack for having a perfect playlist height */
function setPlaylistHeight() {
    var sum = 0;
    $("#playlists-pane").children().each(function() {
        $this = $(this);
        if($this.attr('id') != "playlists") {
            sum += $this.height();
            sum += parseInt($this.css("borderTopWidth"));
            sum += parseInt($this.css("borderBottomWidth"));
            sum += parseInt($this.css("paddingTop"));
            sum += parseInt($this.css("paddingBottom"));
        }
    });
    $("#playlists").css('height', window.innerHeight - sum);
}

function main(loc) {
    position = loc.coords;
    $("#loading-cover").fadeOut(300);
    
    /* Add functionality to search bar */
    $("#restaurant-search").submit(function(e) {
        e.preventDefault();
        if($("#location-bar").val().replace(" ", "") == "" && navigator.geolocation) {
            retrieveSearchResults();
        } else {
            var addr = "&address=" + $("#location-bar").val().replace(" ", "+");
            $.get(googleGeoReq + googleAPIkey + addr, locationLookupComplete);
        }
    });
}

function locError(locErr) {
    alert("You cannot use this site because we could not get your geolocation. The error we got was: " + locErr.code);
}

$(document).ready(function() {
    setPlaylistHeight();
    setTimeout(function() {
        navigator.geolocation.getCurrentPosition(main, locError);
    }, 600);
});

$(window).resize(function() {
    setPlaylistHeight();
});
