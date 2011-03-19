/*------------------------- hanoi --------------------------*/



// Towers is global for debugging purposes
var Towers = new Array();

// Globals so that they can be changed via the UI
var numTowers = 3;
var numColors = 2;
var numDisks = 3;
var canvas; // load the canvas in start (after page is loaded)
var height = 400;
var width = 800;

/*------------------------- start --------------------------*/
/*
 * application starting point
 */


function start() {
    
    // We can't set canvas until after the page is loaded
    canvas = document.getElementById("canvas");

    // Make the towers
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

    // Make the starting disks
    for (var i=numDisks;i>0;i--)
	Towers[0].addDisk(new Disk(canvas,0,0,i*25+25,i,numColors));
    
    // Draw to start
    for (t in Towers){
	Towers[t].draw(canvas.getContext("2d"));
    }


    /*
     * make an array of moves and run them.
     * This is for testing purposes only.
     * remove after ui is done.
     */
    moveList = new Array();
    moveList.push(new Move(0,1));
    moveList.push(new Move(0,2));
    moveList.push(new Move(1,2));
    moveList.push(new Move(0,1));
    moveList.push(new Move(2,0));
    moveList.push(new Move(2,1));
    moveList.push(new Move(0,1));
    
    moveList.push(new Move(1,0));
    moveList.push(new Move(1,2));
    moveList.push(new Move(0,2));
    moveList.push(new Move(1,0));
    moveList.push(new Move(2,1));
    moveList.push(new Move(2,0));
    moveList.push(new Move(1,0));
    
    // play the above move list
    moveListIntervalID=setInterval(playMoves,1,canvas,Towers);


}

window.onload = start;