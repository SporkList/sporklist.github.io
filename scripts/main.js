function setPlaylistHeight() {
    $("#playlists").css('height', window.innerHeight - 60 - 144 - 2);
}

$(document).ready(function () {
    setPlaylistHeight();
});

$(window).resize(function() {
    setPlaylistHeight();
});