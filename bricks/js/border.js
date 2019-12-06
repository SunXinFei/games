(function(){
	var Border=function(x,y,l,h){
		this.x=x;
		this.y=y;
		this.l=l;
		this.h=h;
	}
	Border.prototype.draw = function(context) {
		context.beginPath();

		context.shadowBlur=7;
		context.shadowColor="black";

		context.fillStyle="#d3d7d4";//填充样式
		context.fillRect(this.x,this.y,this.l,this.h);//填充矩形
		context.closePath();
	}
	window.Border=Border;
	
})();