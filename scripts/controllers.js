(function () {
  app = angular.module('app',[]);

  app.controller('PLCtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = [];

    $scope.onClick = function(playlist) {
      alert("nice meme");
      var restaurant = Parse.Object.extend("Restaurant");
      var query = new Parse.Query(restaurant);

      query.equalTo("sporklists", playlist.id);
      query.limit(1000);

      navigator.geolocation.getCurrentPosition(function(location) {
          query.withinMiles("location", new Parse.GeoPoint(location.coords.latitude, location.coords.longitude), 5);
          query.find({
            success: function(results) {
              list = []

              for (var i = 0; i < results.length; i++) { 
                list.push(results[i]);
              }

              console.log(list);
              updateSporklist(list);
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });
      });
    }
  });

  app.controller('MainCtrl',function($scope) {
    /* The defaults for the home page.
     * The only thing that should show is the sidebar and the fb login.
     */
    $scope.user = false;
    $scope.friend = false;
    $scope.search = false;
    $scope.map = false;
  });

  app.controller('MeCtrl', function($scope) {
    $scope.name = "";
  });
}());
