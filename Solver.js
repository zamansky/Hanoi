var moveText;

function solve(n,s,d,t) {
    if (n==1) {
	moveText = moveText+s+" to "+d+"\n";
    }
    else{
	solve(n-1,s,t,d);
	solve(1,s,d,t);
	solve(n-1,t,d,s);
    }
}
/*------------------------- Solver --------------------------*/
//
function solver() {
    moveText="";
    if (numColors==1) {
	solve(numDisks,0,1,2)
	$("#moves").val(moveText);
    }
    else {
	solve(numDisks,0,2,1);
	solve(numDisks,2,1,0);
	$("#moves").val(moveText);
}
}