/* Hides 'my-profile-box by default */

/* This is the angular for the main window */
(function () {
  angular.module('MainWindow',[]).controller('MainCtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */

    /*
    $scope.playlists = playlists;

    $scope.onClick = function(plist) {
      alert("nice meme");
      console.log(plist);
    }
    */

    /* The defaults for the home page.
     * Default is user's profile
     */
    $scope.user = false;
    $scope.friend = false;
    $scope.search = false;
    $scope.map = false;

    console.log($scope.user);


  });
}());
