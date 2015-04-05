function onMouseEnter(e) {
    e.target.firstChild.style.visibility='visible';
}

function onMouseLeave(e) {
    alert(e.target.firstChild.className);
    e.target.firstChild.style.visibility='hidden';
}
