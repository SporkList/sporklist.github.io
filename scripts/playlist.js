var playlists = [];

function updateUserPage (user) {
  /* Do something with the user */
  playlists = ['abc', 'def', 'xyz', 'fuck you michael'];

  var list = document.getElementById("playlists");
  var scope = angular.element(list).scope();

  console.log(list);
  console.log(scope);

  scope.$apply(function() {scope.playlists = playlists});
}

function updateSporklists (sporklists) {

}

/* This is the wrapper for the entire UI */
(function () {
  angular.module('playlist',[]).controller('PLCtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = playlists;
  });
}());
