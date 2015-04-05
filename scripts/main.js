var parseUser = null;
var position = null;
var service = null;
var autocomplete = null;

/* In the case of no location name, we use the user's current location */
function retrieveSearchResults() {
    var place = autocomplete.getPlace();
    var loc = new google.maps.LatLng(position.latitude, position.longitude);
    var request = {
        location: loc,
        radius: '8000',
        types: ['restaurant', 'meal_delivery', 'meal_takeaway', 'cafe'],
        key: 'AIzaSyCnk5Oo0joyYzlR4BVBZsDR2aUteESG0MY',
        keyword: $("#search-bar").val()
    };
    service.nearbySearch(request, displaySearchResults);
}

/* Callback that FINALLY has our search results */
function displaySearchResults(results, status) {
    if(status != google.maps.places.PlacesServiceStatus.OK) {
        alert("Failed to perform search because: " + searchResults.status);
        return;
    }
    updateSearchResults(results);
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
