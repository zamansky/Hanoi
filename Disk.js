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
    this.bColor=("rgb(0,0,255)");
    if (this.colors==2)
	this.bColor=("rgb(255,0,0)");

    this.orientation=1;
}

Disk.prototype.draw = function () {
    this.gc.fillStyle=this.tColor;
    this.gc.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height/2);
    this.gc.fillStyle=this.bColor;
    this.gc.fillRect(this.x-this.width/2,this.y,this.width,this.height/2);
    this.gc.strokeStyle="rgb(0,0,0)";
    this.gc.strokeRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);

}
