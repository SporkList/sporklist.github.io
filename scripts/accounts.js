$(document).ready(function() {
    Parse.initialize("VXRx5pZQAr263FPLmgqY2FHEa66zEOLIuK3I2rl6", "OQkMhfc7hMHcBBkiUoClnxAfrF8gpmKaC3jNKq5V");

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "http://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

function logIn() {
    Parse.FacebookUtils.init({
        appId      : '789662264445561',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.3'
    });

    Parse.FacebookUtils.logIn("user_friends", {
        success: function(user) {
            parseUser = user;

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

            updateUserPage(user);
            retrieveSporklists(user);

            $("#logo-header").click(resetView);

            $("#login-box").fadeOut(700, function() {
                mainWindow = document.getElementById("info-pane");
                scope = angular.element(mainWindow).scope();
                scope.$apply(function() {scope.user = true});
            });
        },
        error: function(user, error) {
            alert("You must sign into Facebook to use this app");
        }
    }); 
};

function retrieveSporklists(user) {
    var sporklist = Parse.Object.extend("Sporklist");
    var query = new Parse.Query(sporklist);

    query.equalTo("author", user.getUsername());
    query.limit(1000);

    query.find({
        success: function(results) {
            updateSporklists(results);
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}
