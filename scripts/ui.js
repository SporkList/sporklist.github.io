function drag(event) {
	event.dataTransfer.setData("text", event.target.textContent);
}

function allowDrop(event) {
	event.preventDefault();
	event.target.
}

function drop(event) {
	console.log(event);
}