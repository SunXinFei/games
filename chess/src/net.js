var netServer = cc.Sprite.extend({
    socket:null,
    gameScene3:null,
    argL:0,
    argR:0,
    cloudX:0,
    cloudY:0,
    whicharg:100,
    touchStart:1,//白子先开始 -1黑子走
    argVisib:-100,
    argboard:-100,
    cloudboard:-100,
    msg:0,//0初始化，1进入房间，2退出房间，3人数已满
    ctor:function(){
        this._super();
        this.initDate();
    },
    initDate:function(){
        /*var host="ws://115.28.9.182:9999";*/
        var host="ws://localhost:9999";
        this.socket=new WebSocket(host);
        this.socket.onopen=function(){
            cc.log("开启服务器");
        };

    },
    send:function(){
        var msg;
        msg=this.msg;
        var argl;
        argl=this.argL;
        var argr;
        argr=this.argR;
        var cloudx;
        cloudx=this.cloudX;
        var cloudy;
        cloudy=this.cloudY;
        var whichA;
        whichA=this.whicharg;
        var touchs=-this.touchStart;
        var whichVisible= this.argVisib;
        var BoardArg=this.argboard;
        var BoardCloud=this.cloudboard;
        var obj={
            text:msg,
            argLine:argl,
            argRow:argr,
            cloudXvalue:cloudx,
            cloudYvalue:cloudy,
            whichSprite:whichA,
            touchStart:touchs,
            argVis:whichVisible,
            boardArg:BoardArg,
            boardCloud:BoardCloud

        };
        var obj1=JSON.stringify(obj);
        this.socket.send(obj1);
    },
    receive:function(){
        var that = this;
        this.socket.onmessage=function(msg){
            var message=JSON.parse(msg.data);
            cc.log(message.text);
            switch(message.text)
            {
                case 2:
                {
                    alert("有人逃跑了,请退出游戏");
                    break;
                }
                case 3:
                {
                    alert("full!玩家人数已满,请退出房间等待");
                    break;
                }
            }
            //数组的交换
            var x=message.cloudXvalue;
            var y=message.cloudYvalue;
            var cloudLine=-(y-278)/40;
            var cloudRow=(x-36)/50;
            var arg=message.whichSprite;//主动的棋子为arg
            cc.log(arg+'which');
            var argline=message.argLine;
            var argrow=message.argRow;
            var whichHide=message.argVis;
            var argBoardChange=message.boardArg;
            var cloudBoardChange=message.boardCloud;
            if(whichHide>=0)
            {
                that.gameScene3.argList[whichHide].setVisible(false);
                that.gameScene3.argList[whichHide].visible=false;
            }
            //老窝
            if(that.gameScene3.board[cloudLine][cloudRow]==-6)//白胜
            {
                for(var i=8;i<=15;i++)
                {
                    that.gameScene3.argList[i].setVisible(false);
                    that.gameScene3.argList[i].visible=false;
                }
            }
            else if(that.gameScene3.board[cloudLine][cloudRow]==-5)//黑色胜
            {
                for(var i=0;i<=7;i++)
                {
                    that.gameScene3.argList[i].setVisible(false);
                    that.gameScene3.argList[i].visible=false;
                }
            }
            that.gameScene3.board[cloudLine][cloudRow]=cloudBoardChange;
            that.gameScene3.board[argline][argrow]=argBoardChange;
            //棋子操作
            var action=cc.MoveTo.create(1,cc.p(x,y));
            that.gameScene3.argList[arg].runAction(action);
            //开启棋子点击
            that.touchStart=message.touchStart;//锁定黑白交替
            that.gameScene3.touchBegin=1;//解除锁定本地
        };
    }

})