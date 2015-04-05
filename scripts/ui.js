function dropCallback(event, index, item, external, type, containerType) {
	item.destroy({
  		success: function(myObject) {
    	// The object was deleted from the Parse Cloud.
  	},
  	error: function(myObject, error) {
    	// The delete failed.
    	// error is a Parse.Error with an error code and message.
  		}
	});
}

function onMove() {
	$(".trash").css("visibility", "visible");
}