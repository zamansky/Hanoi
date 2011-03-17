


function start() {

var canvas = document.getElementById("canvas");
var numTowers = 3;
var height = 400;
var width = 800;
var Towers = new Array();

for (var i=0;i<numTowers;i++) {
    var tBlockWidth= width/numTowers;
    var tCenterX   = i*tBlockWidth+tBlockWidth/2;
    var tCenterY   = height-40;
    var tWidth     = tBlockWidth * .9;
    var tHeight    = (height-40)*.8;

    /* Make the tower */
    Towers.push(new Tower(tCenterX,tCenterY,
			  tWidth,tHeight,
			  canvas));
    
}


for (t in Towers){
    Towers[t].draw();
    console.log(Towers[t]);
}
}


window.onload = start;