/*------------------------- Move.js --------------------------*/
/*
 * Code for low level animation and making moves
 */


/*------------------------- Globals --------------------------*/


// for the animation state machine that removes a disk
// and animates the move to the next tower
var intervalID=false;;

// for checking when the state machine is done so we can add the moving
// disk to the next tower
var intervalID2=false;

// for running the list of moves
var movelistIntervalID;

// Represents a list of moves (from tower to tower)
var moveList;


/*------------------------- Classes --------------------------*/

/*------------------------- Move --------------------------*/
// Represents a game move
function Move(s,d){
    this.src=s;
    this.dst=d;
}



/*------------------------- animStep --------------------------*/
// Used by the state machine to count down a single phase of
// an animation.
function animStep(dx,qx,dy,qy,dr,qr) {
    this.dx = dx; // Direction of x movement
    this.qx = qx; // magnitude of x movement
    this.dy = dy; // same for y 
    this.qy = qy;
    this.dr = dr; // and for rotation
    this.qr = qr;
}




/*------------------------- playMoves --------------------------*/
/*
 * runs through moveList makine each move in turn. 
 */

function playMoves(canvas)
{
    // If intervalID2 is not null, an animation is currently running
    if (intervalID2)
	return;

    // No more moves, stop playMoves from running
    if (moveList.length==0)
	{
	    clearInterval(moveListIntervalID);
	}

    // Run (make) the next move
    var m = moveList.shift();
    if (!m) // unless the array is empty
	return;
    makeMove(canvas,m.src,m.dst);
}

/*------------------------- anim --------------------------*/
/*
 * Runs through a single animation
 * 
 * animSteps - array of animStep instructions
 * d - the disk we are moving
 */
function anim(canvas,animSteps,d) {

    var gc = canvas.getContext("2d");

    // No more steps
    if (animSteps.length==0){
	clearInterval(intervalID);
	// reset to the global coordinate system
	gc.setTransform(1,0,0,1,0,0);
	intervalID=false;
	return;
    }

    var m = animSteps[0];

    // see if we have to change states
    if (m.qx==0 && m.qy==0 && m.qr==0){
	animSteps.shift();
    }
    else
    {
	gc.clearRect(0,0,800,400);
	// Draw the towers in the Global Coordinate System
	gc.save();
	gc.setTransform(1,0,0,1,0,0);
	for (t in Towers)
	    Towers[t].draw();
	gc.restore();

	// do the next step in the animation via transformations
	gc.translate(d.x,d.y);
	gc.rotate(m.dr);
	gc.translate(-d.x,-d.y);
	gc.translate(m.dx,m.dy);
	// Make sure we don't cross 0 to the negatives
	m.qx=m.qx>0?m.qx-1:0;
	m.qy=m.qy>0?m.qy-1:0;
	m.qr=m.qr>0?m.qr-1:0;
	d.draw();
    }
    
}


/*------------------------- makeMove --------------------------*/
/*
 * Runs through a signle move and animates it
 */
function makeMove(canvas,srcIndex,destIndex) {
    var src = Towers[srcIndex];
    var dst = Towers[destIndex];

    if (src==dst)
	return false;

    var d = src.removeDisk();
    if (!d)
	return false;
    
    // Can't make the move, put disk back on src
    if (!dst.canAdd(d)){
	src.addDisk(d);
	return false;
    }

    // To hold the steps (up, lateral, maybe rotate, down)
    var animSteps = new Array();

    // calculate distances and direction for the animation
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


    animSteps.push(new animStep(0,0,-1,virtDist1,0,0));
    animSteps.push(new animStep(dx,horDist,0,0,0,0));
    if (d.colors==2) {
	animSteps.push(new animStep(0,0,0,0,3.14/49,49));
	animSteps.push(new animStep(0,0,-1,virtDist2,0,0));    
    }
    else
    {
	animSteps.push(new animStep(0,0,1,virtDist2,0,0));    
    }

    // anim runs the animation
    // animDone checks to see when we're done so it can
    // add d to the destination tower
    // (the animation doesn't change the towers, it's just for show
    intervalID = setInterval(anim,1,canvas,animSteps,d);
    intervalID2 = setInterval(animDone,1,dst,d);
    return true;
}

/*------------------------- animDone --------------------------*/
/*
 * Checks for when the animation is done.
 * When it is, add d to the dst tower 
 */
function animDone(dst,d){
    if (!intervalID){
	if (d.colors==2){
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
