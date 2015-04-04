$(document).ready(function() {

    var currUser;

    function initialize() {
        // currUser.get("name") := First and last name
        // currUser.get("picture") := String url of profile picture
    }

    Parse.initialize("VXRx5pZQAr263FPLmgqY2FHEa66zEOLIuK3I2rl6", "OQkMhfc7hMHcBBkiUoClnxAfrF8gpmKaC3jNKq5V");

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
          appId      : '789662264445561',
          xfbml      : true,
          version    : 'v2.3'
        });

        Parse.FacebookUtils.logIn("user_likes,email", {
            success: function(user) {
                currUser = user;

                FB.api("/me", function(response) {
                    user.set("name", response.name);
                    user.save();
                });

                FB.api("/me/picture?type=large", function(response) {
                    user.set("picture", response.data.url);
                    user.save();
                });

                FB.api("/me/friendlists", function(response) {
                    console.log("what");
                    console.log(response.data);
                    user.save();
                });

                initialize();
            },
            error: function(user, error) {
                alert("You must sign into Facebook to use this app");
            }
        });
    };

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "http://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});