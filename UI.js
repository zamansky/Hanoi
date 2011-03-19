/*------------------------- UI --------------------------*/

/*------------------------- playSingleMove --------------------------*/
/*
 * 
 */
function playSingleMove(e) {
    var k = e.keyCode;
    if (k==13){
	var text = $("#singlemove").val();
	moveList = new Array();
	var instruction = text.split(' ');
	moveList.push(new Move(instruction[0],instruction[2]));
	/* Add the move to the textarea */
	var text=$("#moves").val();
	text = text+instruction[0]+" to "+instruction[2]+"\n";
	$("#moves").val(text);

	moveListIntervalID=setInterval(playMoves,1,canvas,Towers);
	$("#singlemove").val("")
    }
}



/*------------------------- playMovesFromEntry --------------------------*/
/*
 * read the lines from the textArea
 * move into moveList
 * and run through the moves
 */
function playMovesFromEntry() {
    var text=    $('#moves').val();
    var textArray = text.split('\n');
    moveList = new Array();
    for (l in textArray){
	var instruction = textArray[l].split(' ');
	moveList.push(new Move(instruction[0],instruction[2]));
    }
    moveListIntervalID=setInterval(playMoves,1,canvas,Towers);
}

/*------------------------- resetEntry --------------------------*/
/*
 * erase the list of moves in the entry
 */
function resetEntry () {
   $("#moves").val("");
}

/*------------------------- resetTowers --------------------------*/
/*
 * move all disks back to the first tower
 */
function resetTowers() {
    canvas.getContext("2d").clearRect(0,0,width,height);
    Towers=false;
    makeTowersandDisks();
    drawTowers();

}

/*------------------------- resetAll --------------------------*/
/*
 * Reset / resize / recolor the towers based on selection boxes
 */
function resetAll() {
    var c = $("#colors").find('option:selected').text();
    var d = $("#disks").find('option:selected').text();
    var t = $("#towers").find('option:selected').text();
    numColors=c;
    numDisks=d;
    numTowers = t;
    resetTowers();
}


/*-------------------------  --------------------------*/
// For tracking first and second mouse clicks for movement
var firstClick=false;

/*------------------------- canvasClick --------------------------*/
/*
 * First click -- highlight clicked base
 * second click - reset colors, move disk
 * second click on same tower -- reset colors
 * second click on illegal tower - reset colors
 */
function canvasClick(e) {
    var x,y;

    x = e.layerX;
    y = e.layerY;
    var inTower = false;
    for (t in Towers) {
	var tower = Towers[t];
	if (x>tower.x-tower.width/2 &&
	    x<tower.x+tower.width/2) {
	    inTower = t;
	    break;
	}
    }

    if (inTower){
	if (!firstClick) {
	    if (Towers[inTower].disks.length > 0){
		firstClick=inTower;
		Towers[inTower].clicked=true;
	    }
	    Towers[inTower].draw();
	}
	else
	{
	    for (t in Towers){
		Towers[t].clicked=false;
		Towers[t].draw();
	    }
	    if (inTower == firstClick){
		inTower=false;
		firstClick=false;
		return;
	    }
	    moveList = new Array();
	    moveList.push(new Move(firstClick,inTower));
	    
	    /* Add the move to the textarea */
	    var text=$("#moves").val();
	    text = text+firstClick+" to "+inTower+"\n";
	    $("#moves").val(text);
	    
	    firstClick=false;
	    moveListIntervalID=setInterval(playMoves,1,canvas,Towers);
	    
	}
    }
    
}
/*------------------------- bindButtons --------------------------*/
/*
 * Bind buttons to events
 */
function bindButtons() {
    $('#play').bind('click',playMovesFromEntry);
    $('#resettext').bind('click',resetEntry);
    $('#resetplay').bind('click',resetTowers);
    $('#reinitialize').bind('click',resetAll);
    $('#singlemove').bind('keyup',playSingleMove);

    $("#canvas").bind('click',canvasClick);
}
