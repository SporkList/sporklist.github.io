function updateUserPage(user) {
  /* Do something with the user */
  var playlists = ['abc', 'def', 'xyz', 'fuck you michael'];

  var list = document.getElementById("playlists");
  var scope = angular.element(list).scope();

  console.log(list);
  console.log(scope);

  scope.$apply(function() {scope.playlists = playlists});
}

/* This is the wrapper for the entire UI */
(function () {
  angular.module('UIWrapper',[]).controller('UICtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = playlists;
  });
}());
