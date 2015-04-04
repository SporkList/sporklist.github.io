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
    console.log(friendIds);
    var users = Parse.Object.extend("_User");
    var query = new Parse.Query(users);
    var resList = [ ];
    for(id in friendIds) {
        console.log(id);
        query.equalTo("facebook_id",id);
    }
    query.find( {
        /* add info to some results */
        success: function (results) {
            console.log("success!");
            console.log(results);
            resList.push(results);
        },
        error: function (error) {
            console.log("You have no friends :( " + error);
        }
    });

    var friendList = [];
	
    for(var i=0;i<5;i++) {
        friendList[i] = resList[i].get('name');
    }

    var friendListElem = document.getElementById("friend-name");
    var scope = angular.element(friendListElem).scope();

    scope.$apply(function() {scope.friendList = friendList} );

}

function updateSporklist(sporklist) {

    
}
