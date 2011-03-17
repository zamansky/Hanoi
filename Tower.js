function Tower(x,y,height,width,canvas) {
    this.canvas=canvas;
    this.gc = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.height=height;
    this.width=width;
    this.discs = new Array();
}

Tower.prototype.draw = function()  {
    this.gc.fillStyle="rgb(255,0,0)";
    this.gc.fillRect(this.x,this.y+this.canvas.height-30,100,10);
    this.gc.strokeStyle="rgb(0,0,0)";
    this.gc.strokeRect(this.x,this.y+this.canvas.height-30,100,10);
    console.log(this.canvas.height);
}
