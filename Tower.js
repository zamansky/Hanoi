function Tower(canvas,x,y,width,height) {
    this.canvas=canvas;
    this.gc = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.height=height;
    this.width=width;
    this.discs = new Array();
}

Tower.prototype.draw = function()  {
    this.gc.fillStyle="rgb(184,138,0)";
    this.gc.fillRect(this.x-this.width/2,this.y,this.width,10);

    /*
      this.gc.strokeStyle="rgb(0,0,0)";
      this.gc.strokeRect(this.x-this.width/2,this.y,this.width,10);
    */

    this.gc.fillRect(this.x-5,this.y,10,-this.height*.6);


    /* beginPath
       moveto (from bottom of center post)
       lineto to complete figure
    */       
}
