function updateUserPage (user) {
	var name = user.get("name");
	var picUrl = user.get("picture");
	var friends = user.get("friends");

	var profile = document.getElementById("my-profile-box");
	var scope = angular.element(profile).scope();

	scope.$apply(function() {scope.name = name});
	$("#my-picture").css("background-image", "url(" + picUrl + ")");

}

function updateSporklists (sporklists, position) {
  var sidebarList = document.getElementById("playlists");
  var scope = angular.element(sidebarList).scope();

  scope.$apply(function () {scope.playlists = sporklists});
}

function updateSporklist(sporklist) {
	
}