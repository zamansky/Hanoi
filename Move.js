

function Move(s,d){
    this.src=s;
    this.dst=d;
}


function animStep(dx,qx,dy,qy,dr,qr) {
this.dx = dx;
this.qx = qx;
this.dy = dy;
this.qy = qy;
this.dr = dr;
this.qr = qr;
}





var intervalID=false;;
var intervalID2=false;
var movelistIntervalID;
var isDone=true;
var moveList;

function playMoves(canvas,Towers)
{
    if (intervalID2)
	return;

    if (moveList.length==0)
	{
	    clearInterval(moveListIntervalID);
	}

    var m = moveList.shift();
    if (!m)
	return;
    makeMove(canvas,Towers,m.src,m.dst);

    

}

function anim(canvas,moves,Towers,d) {
    var gc = canvas.getContext("2d");
//gc.globalCompositeOperation = "xor";
    if (moves.length==0)
	{
	    clearInterval(intervalID);
	    gc.setTransform(1,0,0,1,0,0);

	    intervalID=false;
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
    gc.restore();
canvas.clear=true;
	// do the animation
    gc.translate(d.x,d.y);
	gc.rotate(m.dr);
	gc.translate(-d.x,-d.y);
	gc.translate(m.dx,m.dy);
	m.qx=m.qx>0?m.qx-1:0;
	m.qy=m.qy>0?m.qy-1:0;
	m.qr=m.qr>0?m.qr-1:0;
	d.draw();
    }


}



function makeMove(canvas,Towers,srcIndex,destIndex) {

var src = Towers[srcIndex];
var dst = Towers[destIndex];

if (src==dst)
    return false;

var d = src.removeDisk();
if (!d)
    return false;

if (!dst.canAdd(d))
    return false;

var moves = new Array();

var virtDist1 = src.height-(canvas.height-d.y)+20;
var maxy=d.y-virtDist1;
var dd = dst.peek();
var virtDist2 = dst.y-d.height/2 - maxy;
if (dd) {
    virtDist2 = dd.y-d.height - maxy;
}
var horDist = (dst.x - src.x);

var dx=1;

if (horDist<0)
{
dx = -1; horDist = horDist * -1;    
}



moves.push(new animStep(0,0,-1,virtDist1,0,0));
moves.push(new animStep(dx,horDist,0,0,0,0));
if (d.colors==2)
{
moves.push(new animStep(0,0,0,0,3.14/49,49));
moves.push(new animStep(0,0,-1,virtDist2,0,0));    
}
else
{
moves.push(new animStep(0,0,1,virtDist2,0,0));    
}

intervalID = setInterval(anim,1,canvas,moves,Towers,d);
intervalID2 = setInterval(animDone,1,dst,d);
return true;
}

function animDone(dst,d){
    console.log(intervalID);
    if (!intervalID)
    {
	if (d.colors==2)
	{
	    var tmp=d.tColor;
	    d.tColor=d.bColor;
	    d.bColor=tmp;
	}
	dst.addDisk(d);
	dst.draw();
	clearInterval(intervalID2);
	intervalID2=false;
    }
}
