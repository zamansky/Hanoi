function Tower(canvas,x,y,width,height) {
    this.canvas=canvas;
    this.gc = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.height=height;
    this.width=width;
    this.disks = new Array();
}

Tower.prototype.canAdd = function(newdisk) {
    return this.disks.length==0 ||
	this.disks[this.disks.length-1].size<newdisk.size;
}

Tower.prototype.removeDisk = function() {
    if (this.disks.length==0){
	return none;
    }    
    
    return this.disks.pop();
}

Tower.prototype.addDisk = function(newdisk) {
    // add a disk if you can
    if (this.disks.length==0)
    { 
	newdisk.y=this.y-newdisk.height/2;
	newdisk.x=this.x;
	this.disks.push(newdisk);
	return;
    }
    
    var topdisk=this.disks[this.disks.length-1];
    console.log(topdisk.size+" "+newdisk.size);
    if (topdisk.size<newdisk.size)
	return;
    newdisk.y=topdisk.y-newdisk.height;
    newdisk.x=this.x;
    
    this.disks.push(newdisk);
}


Tower.prototype.draw = function()  {
    this.gc.fillStyle="rgb(184,138,0)";
    this.gc.fillRect(this.x-this.width/2,this.y,this.width,10);

    /*
      this.gc.strokeStyle="rgb(0,0,0)";
      this.gc.strokeRect(this.x-this.width/2,this.y,this.width,10);
    */

    this.gc.fillRect(this.x-5,this.y,10,-this.height*.6);


    for (d in this.disks) {
	this.disks[d].draw();
}

    /* beginPath
       moveto (from bottom of center post)
       lineto to complete figure
    */       
}
