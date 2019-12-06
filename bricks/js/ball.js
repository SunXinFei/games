(function(){
	var Ball = function(x,y,r)
	{
	this.x=x;
	this.y=y;
	this.r=r;
	}
	Ball.prototype.draw = function(context) {
	context.beginPath();
	//context.fillStyle="black";//填充样式

	context.shadowBlur=3;
	context.shadowColor="black";//阴影
	var x=this.x-this.r;
	var y=this.y-this.r;
	var r1=this.x+2*this.r;
	var r2=this.y+2*this.r
	var grd=context.createLinearGradient(x,y,r1,r2);
	grd.addColorStop(0,"black");
	grd.addColorStop(0.6,"white");
	grd.addColorStop(1,"black");
	context.fillStyle=grd;//渐变

	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.closePath();
	context.fill();
	}
	window.Ball=Ball;	
})();
