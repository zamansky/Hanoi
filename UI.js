/*------------------------- UI --------------------------*/


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
    numColors=c;
    numDisks=d;
    resetTowers();
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
}
