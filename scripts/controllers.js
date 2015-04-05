(function () {
  app = angular.module('app',[]);

  app.controller('PLCtrl',function($scope) {
    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = [];

    $scope.onClick = function(playlist) {
      var restaurant = Parse.Object.extend("Restaurant");
      var query = new Parse.Query(restaurant);

      query.equalTo("sporklists", playlist.id);
      query.limit(1000);
      query.withinMiles("location", new Parse.GeoPoint(position.latitude, position.longitude), 50);
      query.find({
        success: function(results) {
          updateSporklist(playlist.get("name"), results);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  });

  app.controller('NewPLCtrl', function($scope) {
    $scope.onClick = function() {
      console.log("this");
    };
  });

  app.controller('MainCtrl',function($scope) {
    /* The defaults for the home page.
     * The only thing that should show is the sidebar and the fb login.
     */
    $scope.user = false;
    $scope.friend = false;
    $scope.sporklist = false;
    $scope.search = false;
    $scope.map = false;
  });

  app.controller('MeCtrl', function($scope) {
    $scope.name = "";
    $scope.friendList = [];
    $scope.onClick = function(friend) {
      updateFriend(friend);
    };
  });

  app.controller('FriendCtrl', function($scope) {
    $scope.name = "";
    $scope.sporklists = [];

    $scope.onClick = function(sporklist) {
      var restaurant = Parse.Object.extend("Restaurant");
      var query = new Parse.Query(restaurant);

      query.equalTo("sporklists", sporklist.id);
      query.limit(1000);
      query.withinMiles("location", new Parse.GeoPoint(position.latitude, position.longitude), 50);
      query.find({
        success: function(results) {
          updateSporklist(sporklist.get("name"), results);
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  })

  app.controller('sporkCtrl', function($scope) {
    $scope.name = "";
    $scope.restaurants = [];
  });
  
  app.controller('SearchCtrl', function($scope) {
    $scope.results = [];
  });

}());
