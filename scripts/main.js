var location;
var searchResults;
var yelpReq = "http://api.yelp.com/v2/search";

function yelpGetSearchResults(position) {
    var term = "?term=" + $("#search-bar").val();
    var loc = "&location=" + $("#location-bar").val().replace(" ", "+");
    if(position != null) {
        cll = "&cll=" + position.coords.latitude + "," + position.coords.longitude;
        $.get(yelpReq + term + cll, displaySearchResults);
    } else {
        $.get(yelpReq + term + loc, displaySearchResults);
    }
}

function displaySearchResults(data) {
    searchResults = JSON && JSON.parse(data) || $.parseJSON(data);
    // Put into correct location here.
    $("#restaurant-search-box").fadeIn(100);
}

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

$(document).ready(function() {
    setPlaylistHeight();
    $("#restaurant-search-box").hide();
    $(".restaurant-more").hide();
    
    $("#restaurant-search").submit(function(e) {
        e.preventDefault();
        $("#content-box").children().fadeOut(100);
        
        if($("#location-bar").val().replace(" ", "") == "" && navigator.geolocation)
            navigator.geolocation.getCurrentPosition(yelpGetSearchResults);
        else
            yelpGetSearchResults(null);
    });
});

$(window).resize(function() {
    setPlaylistHeight();
});
