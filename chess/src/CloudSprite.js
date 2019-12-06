var WhiteCloudSprite = cc.Sprite.extend({
    gameScene2:null,
    visible:false,//隐藏或者显现
    argVisible:-100,
    argBoard:-100,
    cloudBoard:-100,
    //Qi:null,
    ctor:function(){
        this._super();
        this.initWithFile(s_baiyun);
        cc.registerTargetedDelegate(this._touchPriority, true, this);
    },
    onTouchBegan:function(touch,event){
        //动画
        var myRect = cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(myRect,getPoint)&&(this.visible==true))
        {
            var arg=this.gameScene2.whichArg;//用board[][]确定argList[]里面的值

            //
            var x=this.getPosition().x.toFixed(0);
            var y=this.getPosition().y.toFixed(0);//获取云的位置
            var action=cc.MoveTo.create(1,cc.p(x,y));
            var cloudLine=-(y-278)/40;//算出云的行列
            var cloudRow=(x-36)/50;
            var argLine=this.gameScene2.argList[arg].line;
            var argRow =this.gameScene2.argList[arg].row;
            var cloudHook=cloudLine+'.'+cloudRow;
            cc.log("arg"+arg);
            if(this.gameScene2.board[cloudLine][cloudRow]==-6)//白胜
            {
                for(var i=8;i<=15;i++)
                {
                    this.gameScene2.argList[i].setVisible(false);
                    this.gameScene2.argList[i].visible=false;
                }
            }
            else if(this.gameScene2.board[cloudLine][cloudRow]==-5)//黑色胜
            {
                for(var i=0;i<=7;i++)
                {
                    this.gameScene2.argList[i].setVisible(false);
                    this.gameScene2.argList[i].visible=false;
                }
            }
            else if(this.gameScene2.argList[arg].in_array(cloudHook,this.gameScene2.hook)==true)
            {
                //吃子
                if((this.gameScene2.board[cloudLine][cloudRow]<=-8)&&(this.gameScene2.board[cloudLine][cloudRow]>=-23)){
                    var whichqi=(-this.gameScene2.board[cloudLine][cloudRow]-8);
                    this.gameScene2.argList[whichqi].setVisible(false);
                    this.gameScene2.argList[whichqi].visible=false;
                    //网络
                    this.argVisible=whichqi;
                }
                //定义变量进行数组交换
                this.gameScene2.board[cloudLine][cloudRow]=(-this.gameScene2.board[argLine][argRow]-8);
                this.gameScene2.board[argLine][argRow]=-1;
                //网络
                this.argBoard=-1;
                this.cloudBoard=this.gameScene2.board[cloudLine][cloudRow];
                this.gameScene2.argList[arg].value=-7;
            }
            //判断不是老鼠
            else if(arg!=0&&arg!=8)
            {
                //吃子
                if(this.gameScene2.board[cloudLine][cloudRow]>=0){
                    var whichqi=this.gameScene2.board[cloudLine][cloudRow];
                    this.gameScene2.argList[whichqi].setVisible(false);
                    this.gameScene2.argList[whichqi].visible=false;
                    //网络
                    this.argVisible=whichqi;
                }
                //定义变量进行数组交换
                this.gameScene2.board[cloudLine][cloudRow]=arg;
                this.gameScene2.board[argLine][argRow]=-1;
                //网络
                this.argBoard=-1;
                this.cloudBoard=arg;
                this.gameScene2.argList[arg].value=arg;
            }
            //是老鼠的话
            else{
                //判断老鼠的history是不是-1 -2
                if(this.gameScene2.argList[arg].history==-1)
                {
                    //判断云是不是在水里
                    if(this.gameScene2.board[cloudLine][cloudRow]==-2)
                    {
                        //入水
                        //定义变量进行数组变换
                        //0白老鼠入水后脚下的board值变成-3
                        if(arg==0)
                        {
                            this.gameScene2.board[cloudLine][cloudRow]=-3;
                            //网络
                            this.cloudBoard=-3;
                            this.gameScene2.argList[arg].value=-3;
                        }
                        //8黑老鼠入水后脚下的board值变成-4
                        else{
                            this.gameScene2.board[cloudLine][cloudRow]=-4;
                            //网络
                            this.cloudBoard=-4;
                            this.gameScene2.argList[arg].value=-4;
                        }
                        this.gameScene2.board[argLine][argRow]=-1;
                        //网络
                        this.argBoard=-1;
                        //history变化
                        this.gameScene2.argList[arg].history=-2;
                    }
                    else
                    {
                        //陆行
                        //吃子
                        if(this.gameScene2.board[cloudLine][cloudRow]>=0){
                            var whichqi=this.gameScene2.board[cloudLine][cloudRow];
                            this.gameScene2.argList[whichqi].setVisible(false);
                            this.gameScene2.argList[whichqi].visible=false;
                            //网络
                            this.argVisible=whichqi;
                        }
                        this.gameScene2.board[cloudLine][cloudRow]=arg;
                        this.gameScene2.board[argLine][argRow]=-1;
                        //网络
                        this.argBoard=-1;
                        this.cloudBoard=arg;
                        this.gameScene2.argList[arg].value=arg;
                        //history变化
                        this.gameScene2.argList[arg].history=-1;
                    }
                }
                else
                {
                    switch (this.gameScene2.board[cloudLine][cloudRow])
                    {
                        case -2:
                        {
                            //水行
                            this.gameScene2.board[cloudLine][cloudRow]=this.gameScene2.board[argLine][argRow];
                            this.gameScene2.board[argLine][argRow]=-2;
                            //网络
                            this.argBoard=-2;
                            this.cloudBoard=this.gameScene2.board[cloudLine][cloudRow];
                            //history变化
                            this.gameScene2.argList[arg].history=-2;
                            break;
                        }
                        case -1:
                        {
                            //出水
                            this.gameScene2.board[argLine][argRow]=-2;
                            //网络
                            this.argBoard=-2;
                            //history变化
                            this.gameScene2.argList[arg].history=-1;
                            //value变化
                            if(arg==0)
                            {
                                //老鼠出水后脚下的board值变成原来的值
                                this.gameScene2.board[cloudLine][cloudRow]=0;
                                //网络
                                this.cloudBoard=0;
                                this.gameScene2.argList[arg].value=0;
                                break;
                            }
                            else
                            {
                                //老鼠入水后脚下的board值变成原来的值
                                this.gameScene2.board[cloudLine][cloudRow]=8;
                                //网络
                                this.cloudBoard=8;
                                this.gameScene2.argList[arg].value=8;
                                break;
                            }
                        }
                        case -4://云的位置是黑鼠8
                        {
                            //吃黑鼠8
                            var whichqi=8;
                            this.gameScene2.argList[whichqi].setVisible(false);
                            this.gameScene2.argList[whichqi].visible=false;
                            this.argVisible=whichqi;

                            this.gameScene2.board[cloudLine][cloudRow]=this.gameScene2.board[argLine][argRow];
                            this.gameScene2.board[argLine][argRow]=-2;
                            //网络
                            this.argBoard=-2;
                            this.cloudBoard=this.gameScene2.board[cloudLine][cloudRow];
                            //history变化
                            this.gameScene2.argList[arg].history=-2;
                            break;
                        }
                        case -3:
                        {
                            //吃白鼠0
                            var whichqi=0;
                            this.gameScene2.argList[whichqi].setVisible(false);
                            this.gameScene2.argList[whichqi].visible=false;
                            this.argVisible=whichqi;

                            this.gameScene2.board[cloudLine][cloudRow]=this.gameScene2.board[argLine][argRow];
                            this.gameScene2.board[argLine][argRow]=-2;
                            //网络
                            this.argBoard=-2;
                            this.cloudBoard=this.gameScene2.board[cloudLine][cloudRow];
                            //history变化
                            this.gameScene2.argList[arg].history=-2;
                            break;
                        }
                    }
                }
            }
            //循环遍历让云数组消失
            for(var i=0;i<this.gameScene2.argList[arg].cloudPos.length;i++)
            {
                this.gameScene2.cloud[i].setVisible(false);
                this.gameScene2.cloud[i].visible=false;
            }
            //下棋的位置数组为零
            this.gameScene2.argList[arg].cloudPos.length=0;
            this.gameScene2.argList[arg].runAction(action);
            //锁定本地棋子
            this.gameScene2.touchBegin=0;
            //锁定本地的辰or卯并初始化
            this.gameScene2.chenSprite.stopAllActions();
            this.gameScene2.maoSprite.stopAllActions();
            this.gameScene2.maoSprite.setScale(0.5);
            this.gameScene2.maoSprite.setOpacity(200);
            this.gameScene2.chenSprite.setScale(0.5);
            this.gameScene2.chenSprite.setOpacity(200);
            //网络端操作
            this.gameScene2.net.cloudX=x;
            this.gameScene2.net.cloudY=y;
            this.gameScene2.net.argL=argLine;
            this.gameScene2.net.argR=argRow;
            this.gameScene2.net.whicharg=arg;
            this.gameScene2.net.argVisib=this.argVisible;
            this.gameScene2.net.argboard=this.argBoard;
            this.gameScene2.net.cloudboard=this.cloudBoard;
            this.gameScene2.net.send();
        }
    }
})