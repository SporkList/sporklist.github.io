function updateUserPage (user) {
	console.log(user);
}

function updateSporklists (sporklists, position) {
  var sidebarList = document.getElementById("playlists");
  var scope = angular.element(sidebarList).scope();

  scope.$apply(function () {scope.playlists = sporklists});
}