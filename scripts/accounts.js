$(document).ready(function() {

    var currUser;

    function retrieveSporklists() {
        var sporklist = Parse.Object.extend("Sporklist");
        var query = new Parse.Query(sporklist);

        query.equalTo("author", currUser.getUsername());
        query.limit(1000);

        var lists = [];
        query.find({
            success: function(results) {
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) { 
                    lists.push(results[i]);
                }

                updateSporklists(lists);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    Parse.initialize("VXRx5pZQAr263FPLmgqY2FHEa66zEOLIuK3I2rl6", "OQkMhfc7hMHcBBkiUoClnxAfrF8gpmKaC3jNKq5V");

    function logIn() {
        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
              appId      : '789662264445561',
              status     : true,
              cookie     : true,
              xfbml      : true,
              version    : 'v2.3'
            });

            Parse.FacebookUtils.logIn("user_friends", {
                success: function(user) {
                    currUser = user;

                    FB.api("/me", function(response) {
                        user.set("name", response.name);
                        user.set("facebook_id", response.id);
                        user.save();
                    });

                    FB.api("/me/picture?type=large", function(response) {
                        user.set("picture", response.data.url);
                        user.save();
                    });

                    FB.api("/me/friends", function(response) {
                        for (i = 0; i < response.data.length; i++) {
                            user.addUnique("friends", response.data[i].id);
                        }

                        user.save();
                    });

                    updateUserPage(currUser);
                    retrieveSporklists();
                },
                error: function(user, error) {
                    alert("You must sign into Facebook to use this app");
                }
            });
        }

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "http://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };

});
