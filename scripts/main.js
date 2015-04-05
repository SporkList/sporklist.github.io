var parseUser = null;
var position = null;
var service = null;
var autocomplete = null;
var searchResults = null;
var count = 0;

/* In the case of no location name, we use the user's current location */
function retrieveSearchResults() {
    var loc;
    var place = autocomplete.getPlace();
    
    if(place == undefined || $("#location-bar").val().replace(" ", "") == "")
        loc = new google.maps.LatLng(position.latitude, position.longitude);
    else
        loc = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
    
    var request = {
        location: loc,
        radius: '8000',
        types: ['restaurant', 'meal_delivery', 'meal_takeaway', 'cafe'],
        key: 'AIzaSyCnk5Oo0joyYzlR4BVBZsDR2aUteESG0MY',
        keyword: $("#search-bar").val()
    };
    
    //service.nearbySearch(request, displaySearchResults);
}

/* Callback that FINALLY has our search results */
function displaySearchResults(results, status) {
    if(status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Failed to perform search because: " + status);
        return;
    }
    
    count = results.length;
    searchResults = [];
    
    for(var i = 0; i < results.length; i += 1) {
        var request2 = {
            placeId: results[i].place_id
        };
        service.getDetails(request2, addDetails);
    }
}

function addDetails(result, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) searchResults.push(result);
    count -= 1;
    if(count <= 0) updateSearchResults(searchResults);
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
    service = new google.maps.places.PlacesService(/** @type {HTMLInputElement} */(document.getElementById('attributions')));
    autocomplete = new google.maps.places.Autocomplete(/** @type {HTMLInputElement} */(document.getElementById('location-bar')), { types: ['geocode'] });

    position = loc.coords;
    $("#loading-cover").fadeOut(300);
    
    /* Add functionality to search bar */
    $("#restaurant-search").submit(function(e) {
        e.preventDefault();
        retrieveSearchResults();
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
