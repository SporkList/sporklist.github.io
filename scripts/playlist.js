function updateUserPage (user) {
  /* Do something with the user
   * OLD TEST CODE
  playlists = ['abc', 'def', 'xyz', 'fuck you michael'];

  var list = document.getElementById("playlists");
  var scope = angular.element(list).scope();

  console.log(list);
  console.log(scope);

  scope.$apply(function() {scope.playlists = playlists});
  */
}

function updateSporklists (sporklists, position) {
  var sidebarList = document.getElementById("playlists");
  var scope = angular.element(sidebarList).scope();

  /* scope.$apply(function() {scope.playlists = sporklists}); */
  scope.$apply(function () {scope.playlists = sporklists});
}

/* This is the angular for the sidebar */
(function () {
  angular.module('Playlist',[]).controller('PLCtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = [];

    $scope.onClick = function(playlist) {
      var restaurant = Parse.Object.extend("Restaurant");
      var query = new Parse.Query(restaurant);

      query.equalTo("sporklists", playlist.id);
    }
  });
}());
