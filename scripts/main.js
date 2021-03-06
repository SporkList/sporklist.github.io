var parseUser = null;
var position = null;
var service = null;
var autocomplete = null;
var searchResults = null;
var count = 0;
var currListId = -1;
var currListName = "";
var isMe = true;

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
    
    service.nearbySearch(request, displaySearchResults);
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

function dragstartAdd(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('pid', e.target.getAttribute('data-uid'));
}

function dragoverAdd(e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    e.dataTransfer.dropEffect = 'copy';
    return false;
}

function dragenterAdd(e) { $(e.target).addClass('over'); }
function dragleaveAdd(e) { $(e.target).removeClass('over'); }

function dropAdd(e) {
    if (e.stopPropagation) e.stopPropagation();
    var pid = e.dataTransfer.getData('pid');
    var uid = e.target.getAttribute('data-uid');
    $(e.target).removeClass("over");
    
    var choice;
    for(var i = 0; i < searchResults.length; i += 1) {
        if(searchResults[i].place_id == pid) {
            choice = searchResults[i];
            break;
        }
    }
    
    /* Integrate with shit here */
    var name = choice.name;
    var url = choice.website;
    var loc = new Parse.GeoPoint({latitude: choice.geometry.location.lat(), longitude: choice.geometry.location.lng()});

    var restaurant = Parse.Object.extend("Restaurant");
    var query = new Parse.Query(restaurant);
    query.equalTo("place_id", pid);
    query.find({
        success: function(results) {
            var target;
            if (results.length == 0) {
                target = new restaurant();
                target.set("place_id", pid);
                target.set("name", name);
                target.set("location", loc);
                target.set("sporklists", []);
                target.set("url", url);
            } else {
                target = results[0];
            }

            var list = target.get("sporklists");
            list.push(uid);
            target.set("sporklists", list);

            target.save();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
    });
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

    Mousetrap.bind("up up down down left right left right b a enter", function() {
        $("#the_truth").fadeIn(2000);
    });

    Mousetrap.bind("esc", function() {
        $("#the_truth").fadeOut(1000);
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
