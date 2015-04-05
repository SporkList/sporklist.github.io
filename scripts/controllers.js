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

      $scope.mouseenter = function() {
        console.log("asdf");
        $(this).children('.delete').show();
      }

      $scope.mouseleave = function() {
        $(this).children('.delete').hide();
      }
    }

    $scope.mouseenter = function() {
      $($(this).children()[0]).css("visibility", "visible");
    }

    $scope.onDeleteClick = function(playlist) {
      console.log("asdf");
    }
  });

  app.controller('NewPLCtrl', function($scope) {
    $scope.onClick = function() {
      if (parseUser == null) {
        return;
      }
      
      $("#new-sporklist").css("visibility", "visible");
      $("#new-sporklist").focus();
      $('#new-sporklist').keyup(function(e){
        if(e.keyCode == 13) {
            var sporklist = Parse.Object.extend("Sporklist");
            var newList = new sporklist();
            newList.set("name", $("#new-sporklist").val());
            newList.set("author", parseUser.getUsername());
            newList.save();

            parseUser.fetch({
              success: function(myObject) {
                var sporklist = Parse.Object.extend("Sporklist");
                var query = new Parse.Query(sporklist);

                query.equalTo("author", parseUser.getUsername());
                query.limit(1000);

                query.find({
                    success: function(results) {
                        updateSporklists(results);
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
              },
              error: function(myObject, error) {
                // The object was not refreshed successfully.
                // error is a Parse.Error with an error code and message.
              }
            });

            $(this).css("visibility", "hidden");
            $(this).val("");
        } else if (e.keyCode == 27) {
            $(this).css("visibility", "hidden");
            $(this).val("");
        }
      });
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

    $scope.follow = function (obj) {
      window.open(obj.get('url'));
    };
  });
  
  app.controller('SearchCtrl', function($scope) {
    $scope.results = [];
  });

}());
