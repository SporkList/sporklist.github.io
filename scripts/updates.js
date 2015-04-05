function updateUserPage (user) {
	var name = user.get("name");
	var picUrl = user.get("picture");
	var friends = user.get("friends"); /* Array of strings (fb ids) */

	var profile = document.getElementById("my-profile-box");
	var scope = angular.element(profile).scope();

	scope.$apply(function() {scope.name = name});
	$("#my-picture").css("background-image", "url(" + picUrl + ")");

    getFriends(friends);
}

function updateSporklists (sporklists, position) {
    var sidebarList = document.getElementById("playlists");
    var scope = angular.element(sidebarList).scope();

    scope.$apply(function () {scope.playlists = sporklists});
}

function getFriends (friendIds) {
    var users = Parse.Object.extend("_User");
    var query = new Parse.Query(users);
    var resList;
    query.containedIn("facebook_id",friendIds);
    query.find( {
        /* add info to some results */
        success: function (results) {
            var friendListElem = document.getElementById("my-profile-box");
            var scope = angular.element(friendListElem).scope();

            scope.$apply(function() {scope.friendList = results} );
        },
        error: function (error) {
            console.log("You have no friends :( " + error);
        }
    });

}

function updateSporklist(name, sporklist) {
    var main = document.getElementById("info-pane");
    var scope = angular.element(main).scope();

    scope.$apply(function() {
        scope.user = false;
        scope.friend = false;
        scope.sporklist = true;
        scope.search = false;
        scope.map = false;   
    });

    var spork = document.getElementById("sporklist");
    var scope = angular.element(spork).scope();

    scope.$apply(function() {
        scope.name = name;
        scope.restaurants = sporklist;
    });
}
