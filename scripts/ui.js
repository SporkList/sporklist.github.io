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



function updateUserPage(user) {
  /* Do something with the user */
  
  /* This is the wrapper for the entire UI */
  (function () {
    angular.module('UIWrapper',[]).controller('UICtrl',function() {
      /* Debug code */
      console.log("wrapper got called");
  
      /* EDIT THE FOLLOWING FOR REAL DATA */
  
      /* playlists -> get playlists from Parse */
      this.playlists = ['abc', 'def', 'xyz'];

      /* Get user's friends */
      this.friends = currUser.get("friends");

      /* Get user's name */
      this.name = currUser.get("name");

      /* Get user's picture */
      this.picture = currUser.get("picture");
  
    });
  }());
  
}
