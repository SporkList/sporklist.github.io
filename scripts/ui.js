$(document).ready(function() {

	$(".playlist-wrapper").mouseenter(function() {
		$($(this).children()[0]).css("visibility", "visible");
	});

	$(".playlist-wrapper").mouseleave(function() {
		$($(this).children()[0]).css("visibility", "hidden");
	})

});