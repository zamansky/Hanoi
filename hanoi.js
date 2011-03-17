


function start() {

var canvas = document.getElementById("canvas");
var T = new Tower(10,10,canvas);
T.draw();
}


window.onload = start;