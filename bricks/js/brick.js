(function(){
	var Brick=function(x,y,l,h,r,c){
		this.x=x;
		this.y=y;
		this.l=l;
		this.h=h;
		this.r=r;
		this.c=c;
		}
	Brick.prototype.draw = function(context) {
		context.beginPath();

		context.shadowBlur=10;
		context.shadowColor="#77787b";

		context.fillStyle="#d3d7d4";//填充样式
		context.fillRect(this.x,this.y,this.l,this.h);//填充矩形
		context.closePath();
	}
	window.Brick=Brick;
})();