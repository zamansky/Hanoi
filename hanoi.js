


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
    Towers.push(new Tower(canvas,tCenterX,tCenterY,
			  tWidth,tHeight));
    
}

for (var i=3;i>0;i--)
    Towers[0].addDisk(new Disk(canvas,0,0,i*25+25,1,2));
    
for (t in Towers){
    Towers[t].draw(canvas.getContext("2d"));
    console.log(Towers[t]);
}


var moves = new Array();
moves.push(new Move(0,0,-1,50,0,0));
moves.push(new Move(1,100,0,0,0,0,100));
moves.push(new Move(0,0,0,0,3.14/50,49));
moves.push(new Move(0,0,-1,50,0,0));
moves.push(new Move(-1,200,0,0,0,0));
moves.push(new Move(0,0,-1,50,0,0));
moves.push(new Move(0,0,0,0,3.14/50,49));
var d = new Disk(canvas,50,300,50,1,2);
d.draw();

    intervalID=setInterval(anim,1,canvas,moves,Towers,d);

}

var intervalID;

function anim(canvas,moves,Towers,d) {
    var gc = canvas.getContext("2d");
//gc.globalCompositeOperation = "xor";
    if (moves.length==0)
	{
	    clearInterval(intervalID);
	    return;
	}
    var m = moves[0];

// see if we have to change states
    if (m.qx==0 && m.qy==0 && m.qr==0)
	{
	    moves.shift();
	}
    else
    {
	gc.clearRect(0,0,800,400);
    gc.save();
    gc.setTransform(1,0,0,1,0,0);
	for (t in Towers)
	    Towers[t].draw();
    gc.restore();}
canvas.clear=true;
	// do the animation
    gc.translate(d.x,d.y);
	gc.rotate(m.dr);
	gc.translate(-d.x,-d.y);
	gc.translate(m.dx,m.dy);
	m.qx=m.qx?m.qx-1:0;
	m.qy=m.qy?m.qy-1:0;
	m.qr=m.qr?m.qr-1:0;
	d.draw();





}

window.onload = start;