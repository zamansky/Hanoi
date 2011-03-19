/*------------------------- Tower.js --------------------------*/
/*
 * a Tower holds an array of disks
 */


/*------------------------- Tower constructor --------------------------*/
/*
 * 
 */
function Tower(canvas,x,y,width,height) {
    this.canvas=canvas;
    this.gc = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.height=height;
    this.width=width;
    this.disks = new Array();
}

/*------------------------- canAdd --------------------------*/
/*
 * Returns : true if newdisk can be placed on the tower
 *           false otherwise
 */
Tower.prototype.canAdd = function(newdisk) {
    var ret=this.disks.length==0 ||
	this.disks[this.disks.length-1].size>newdisk.size;
    return ret;
}

/*------------------------- peek --------------------------*/
/*
 * returns the disk on the top of the tower 
 */
Tower.prototype.peek = function() {
    if (this.disks.length==0)
	return false
    return this.disks[this.disks.length-1];
}

/*------------------------- removeDisk --------------------------*/
/*
 * removes and returns the disk on the top of the tower
 */
Tower.prototype.removeDisk = function() {
    if (this.disks.length==0){
	return false;
    }    
    
    return this.disks.pop();
}

/*------------------------- addDisk --------------------------*/
/*
 * Adds newdisk to tower if it can legally, otherwise just 
 * return.
 */
Tower.prototype.addDisk = function(newdisk) {
    // add a disk if you can
    if (this.disks.length==0) { 
	newdisk.y=this.y-newdisk.height/2;
	newdisk.x=this.x;
	this.disks.push(newdisk);
	return;
    }
    
    // make sure newdisk is smaller than the top disk
    var topdisk=this.disks[this.disks.length-1];
    if (topdisk.size<newdisk.size)
	return;

    // Adjust x and y coordinates as needed
    newdisk.y=topdisk.y-newdisk.height;
    newdisk.x=this.x;
    
    this.disks.push(newdisk);
}

/*------------------------- draw --------------------------*/
/*
 * Draw the Tower (and call draw for all disks) 
 */
Tower.prototype.draw = function()  {
    this.gc.fillStyle="rgb(184,138,0)";
    this.gc.fillRect(this.x-this.width/2,this.y,this.width,10);

    this.gc.fillRect(this.x-5,this.y,10,-this.height*.6);
    for (d in this.disks) {
	this.disks[d].draw();
    }
}
