(function(){
	var Game = function(){
		this.ball = null;
		this.border = null;
		this.bricks = new Array();

		this.brickCol = 0;//砖块列数
		this.brickRow = 0;//行数
		this.brickWidth = 0;
		this.brickHeight = 0;
		this.brickPad = 0;//砖块间隔
		this.canWidth = 0;	//界面宽度
		this.canHeight = 0;//界面高度

		this.borderWidth = 100;//挡板的宽度
		///this.borderHeight = 10;//挡板的高度*/
		this.k=0;

		this.dx = 2;
		this.dy = 4;
	}

	Game.prototype.init = function(){
		//初始化小球
		this.ball = new Ball(300,380,10);
		//初始化木板
		this.border = new Border(250,387,100,10);
		//初始化砖块
		var maxPad = (this.brickCol-1)*this.brickPad;//总的砖块间隔
		var w=(this.canWidth-maxPad)/this.brickCol;//一个砖块的宽度
		this.brickWidth=w;//砖块宽度得到
		//砖块的摆放
		for (var i = 0; i <this.brickCol; i++) {
			this.bricks[i]=new Array();

			for(var j=0;j<this.brickRow;j++){
				var x = i*this.brickWidth +i*this.brickPad;
				var y = j*this.brickHeight+j*this.brickPad;
				/*var brick = new Brick(x,y,this.brickWidth,this.brickHeight,j,i);
				this.bricks[i][j]=brick;*/
				this.bricks[i][j]=new Brick(x,y,this.brickWidth,this.brickHeight,j,i);
			}
		};
	}

	Game.prototype.draw = function(context){
		context.clearRect(0,0,this.canWidth,this.canHeight);
		this.ball.draw(context);
		this.border.draw(context);
		//不理解
		for (var i = 0; i < this.bricks.length; i++) {
			for(var j = 0;j<this.bricks[i].length;j++)
			{
				if(this.bricks[i][j]!=null)
					this.bricks[i][j].draw(context);
			}
		};
	}

	Game.prototype.hitTestBall = function(){
		if(this.ball.x<=0||this.ball.x>=this.canWidth)
		{
			this.dx=-this.dx;
		}
		if(this.ball.y>=this.canHeight)
		{
			return -1;
		}
		if(this.ball.y<=0)//
		{
			this.dy=-this.dy;
		}
	}
	Game.prototype.hitTestBricks = function(obj){
		var x1 = obj.x;
		var x2 = obj.x+this.brickWidth;
		var y1 = obj.y;
		var y2 = obj.y+this.brickHeight;

		var ballx=this.ball.x;
		var bally=this.ball.y;

		var ballrx1=this.ball.x-this.ball.r;
		var ballrx2=this.ball.x+this.ball.r;
		var ballry1=this.ball.y-this.ball.r;
		var ballry2=this.ball.y+this.ball.r;

		var x3=obj.x+2*this.brickWidth;
		var y3=obj.y+2*this.brickHeight;
		if(obj!=null && (ballx>=x1 &&ballx<=x2&&bally<=y2 &&bally>=y1))
			//这里修改
			{
			this.dy = -this.dy;
			this.bricks[obj.c][obj.r]=null;
			this.k=this.k+1;
			this.Score();
			}
		}
		Game.prototype.Score = function(){
			var span = document.getElementById('span');
			span.innerHTML ="";
			span.innerHTML = "SCORE:"+this.k;
		}
		Game.prototype.run = function(){
			this.ball.x += this.dx;
			this.ball.y += this.dy;//这里修改 + 改为正
		}
		Game.prototype.hitTestBorder=function(){
			var ballx= this.ball.x;
			var bally= this.ball.y;

			var borderx = this.border.x;
			var bordery = this.border.y;
			var x2=borderx+this.border.l;
			if(ballx>=borderx&&ballx<=x2&&bally>=bordery)
			{
				this.dy = -this.dy;
			}
		}
		Game.prototype.TestBorder=function(){
			var x2 = this.border.x+this.border.l;
			if(this.border.x<=0)
			{
				return 1;
				//禁止向左走

			}
			if(x2>=this.canWidth)
			{
				return -1;
				
				//禁止向右走
			}

		}
	window.Game =Game;
})();