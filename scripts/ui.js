$(document).ready(function() {
	console.log("1");

	$(".playlist-wrapper").mouseenter(function() {
		console.log("2");
		$($(this).children()[0]).css("visibility", "visible");
	});

	$(".playlist-wrapper").mouseleave(function() {
		$($(this).children()[0]).css("visibility", "hidden");
	})

});