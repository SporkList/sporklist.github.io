/* Hides 'my-profile-box by default */

console.log("ddd");

/* This is the angular for the main window */
var mod = angular.module('MainWindow',[]);

mod.controller('MainCtrl',function($scope) {
  /* EDIT THE FOLLOWING FOR REAL DATA */

  console.log("b");

  /* The defaults for the home page.
   * The only thing that should show is the sidebar and the fb login.
   */
  $scope.user = false;
  $scope.friend = false;
  $scope.search = false;
  $scope.map = false;

  console.log($scope.user);
  console.log($scope.user);
  console.log($scope.user);
  console.log($scope.user);
  console.log($scope.user);


})();
