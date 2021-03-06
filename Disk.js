/*------------------------- Disk --------------------------*/


/*------------------------- Disk Constructor --------------------------*/
/*
 * Disks can only be 1 or 2 color
 */
function Disk(canvas,x,y,size,number,colors){
    this.canvas=canvas;
    this.gc = canvas.getContext("2d");
    this.x=x;
    this.y=y;
    this.size=size;
    this.width=size;
    this.height=16;
    this.number=number;
    this.colors=colors;
    this.tColor=("rgb(255,0,0)");
    this.bColor=("rgb(255,0,0)");
    if (this.colors==2)
	this.bColor=("rgb(0,0,255)");
}


/*------------------------- draw --------------------------*/
/*
 * x,y is the center of the disk
 */

Disk.prototype.draw = function () {
    this.gc.fillStyle=this.tColor;
    this.gc.fillRect(this.x-this.width/2,this.y-this.height/2,
		     this.width,this.height/2);
    this.gc.fillStyle=this.bColor;
    this.gc.fillRect(this.x-this.width/2,this.y,this.width,this.height/2);
    this.gc.strokeStyle="rgb(0,0,0)";
    this.gc.strokeRect(this.x-this.width/2,this.y-this.height/2,
		       this.width,this.height);
}



