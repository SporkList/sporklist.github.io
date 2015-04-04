/* This is the controller that will control how the search rsults loook 
var srcInfo = angular.module('SrcInfo', []);

yelpInfo.controller('SrcInfoCtrl',function () {
  
});
*/

/* This is the info for the profile of you and your friends 
var friendInfo = angular.module('FriendInfo',[]);

friendInfo.controller('FriendInfoCtrl', function () {

});
*/

/* This is what's in your playlist 
var playlist = angular.module('Playlist', []);

playlist.controller('PlaylistCtrl', function () {

});
*/

/* This is your list of playlists
var playlistList = angular.module('PlaylistList',[]);

playlistLIst.controller('PLLCtrl', function() {

});
*/

/* This is the wrapper for the entire UI */
(function () {
  angular.module('UIWrapper',[]).controller('UICtrl',function($scope) {
    /* Debug code */
    console.log("ablsdjflasjdlf");

    /* EDIT THE FOLLOWING FOR REAL DATA */

    /* playlists -> get playlists from Parse */
    $scope.playlists = [
      {name:'abc'},
      {name:'def'},
      {name:'xyz'}
    ];

    for(var i=0;i<playlists.length;i++) {
      console.log(playlists[i].name);
    }

    /* User profile -> get user info from Parse */
    $scope.user = {'name':'yiwen song','pictureURL':'img/sample.jpg'};
  });
}());
