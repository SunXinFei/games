var GameScene1= cc.Scene.extend({
    gameLayer:null,
    pointX:0,//点击点所在的行数
    pointY:0,
    startX:147,
    startY:57,
    spaceX:36,
    spaceY:36,
    my:1,//玩家阵营
    isPlay:true,
    Ai:null,
    heiMusic:"res/Sound/hei.wav",
    baiMusic:"res/Sound/bai.wav",
    pan:null,
    map:[],
    count:0,//增加全局变量来计算点击的次数，奇数是白子，偶数出黑子
    ////////////////////////////悔棋
    undoButton:null,//按钮
    history:[],//历史记录
    undoNum:0,//悔棋次数
    regret:3,
    ctor:function(){
        this._super();
        cc.registerTargetedDelegate(this._touchPriority, true, this);
    },
    onEnter:function(){
        this._super();
        this.initData();
        this.Ai=new AI();
        this.map=this.createMap();
    },
    initData:function(){
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //
        //
        var size = cc.Director.getInstance().getWinSize();
        var bg0=cc.Sprite.create(s_bg0);
        bg0.setAnchorPoint(0.25,0);
        bg0.setPosition(0,0);
        bg0.setScale(2.3);
        this.gameLayer.addChild(bg0,0);
        //
        var bg=cc.Sprite.create(s_bg);
        bg.setPosition(size.width/2,size.height/2);
        this.gameLayer.addChild(bg,1);
        //
        this.pan=cc.Sprite.create(s_pane);
        this.gameLayer.addChild(this.pan,1);
        this.pan.setPosition(-20,-20);

        ///////////////////////////////////////悔棋按钮图片
        var menuImage=cc.Sprite.create(s_btn);
        menuImage.setScale(0.9);
        menuImage.setPosition(58,60);
        this.gameLayer.addChild(menuImage,2);
        ////悔棋按钮
        var menuItem1=cc.MenuItemFont.create("悔棋"+"("+this.regret+")",this.undo,this);
        menuItem1.setFontSize(20);
        menuItem1.setColor(cc.c4(0,0,0,255));
        this.undoButton = cc.Menu.create(menuItem1);
        this.addChild( this.undoButton,2);
        this.undoButton.setPosition(58,65);

        //返回首页按钮//////////////////////////////////////////////////////////////////////////
        var menuItemImg2 = cc.MenuItemImage.create(s_back,s_back,this.repScene,this);
        menuItemImg2.setAnchorPoint(0.5,0.5);
        menuItemImg2.setPosition(-435,250);
        var menu=cc.Menu.create(menuItemImg2);
        bg.addChild(menu);
        ////////////////////////////////////////////////////////////////////////////////////////
    },
    /////////////悔棋调用的方法
    undo:function(){
        // ///////
        // console.log(this.undoButton.isEnabled());
        if(this.isPlay && this.history.length !== 0){
            if(this.undoNum == 3){
                alert('您已用完3次悔棋的机会！')
                // this.undoButton.isEnabled(false);

            }else{
                var p = this.history.pop();
                var r = this.history.pop();

                this.map[p.x][p.y] = 0;
                this.map[r.x][r.y] = 0;

                this.gameLayer.removeChild(p.sprite);
                this.gameLayer.removeChild(r.sprite);

                //找到最后一个数组元素
                var last=this.history[this.history.length-1];

                this.pan.setPosition(last.x*this.spaceX+this.startX,last.y*this.spaceY+this.startY);
                this.undoNum++;
                //变量显示表示悔棋次数
                this.regret--;
                this.removeChild(this.undoButton);
                var menuItem1=cc.MenuItemFont.create("悔棋"+"("+this.regret+")",this.undo,this);
                menuItem1.setFontSize(20);
                menuItem1.setColor(cc.c4(0,0,0,255));
                this.undoButton = cc.Menu.create(menuItem1);
                this.addChild( this.undoButton,2);
                this.undoButton.setPosition(58,65);
            }
        }

    },
    //返回首页函数
    repScene:function(){
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new FirstScene));
        this.isPlay=false;
    },
    createMap:function(){
        var arr=[];
        for (var i=0; i<15; i++){
            arr[i]=[];
            for (var n=0; n<15; n++){
                arr[i][n]=0;
            }
        }
        return arr;
    },

    //起点（96，56）终点（600，560）一个格子36*36，中间元心是（348，308）
    onTouchBegan:function(touch,event){
        if(this.count%2==0)
        {
            if(this.isPlay==false) return false;
            var getPoint = touch.getLocation();
            //增加点击范围
            if(getPoint.x<680&&getPoint.x>117&&getPoint.y<592&&getPoint.y>27){
            this.pointX=Math.round((getPoint.x-this.startX)/this.spaceX);
            this.pointY=Math.round((getPoint.y-this.startY)/this.spaceY);
            if(this.pointX<0) this.pointX=0;
            if(this.pointX>14) this.pointX=14;
            if(this.pointY<0) this.pointY=0;
            if(this.pointY>14) this.pointY=14;
            if(this.map[this.pointX][this.pointY]==0)
            {
                this.my=1;
                var cp=this.clickPoint(this.pointX,this.pointY,this.my);
                var blackSprite =cc.Sprite.create(s_hei);
                blackSprite.setAnchorPoint(0.45,0.6);
                blackSprite.setPosition(this.pointX*this.spaceX+this.startX,this.pointY*this.spaceY+this.startY);
                this.gameLayer.addChild(blackSprite,2);
                //定位棋子和边框
                this.pan.setPosition(this.pointX*this.spaceX+this.startX,this.pointY*this.spaceY+this.startY);
                ///////////////压入历史记录栈
                this.history.push({x:this.pointX,y:this.pointY,sprite:blackSprite});
                cc.AudioEngine.getInstance().playEffect(this.heiMusic, false);
                if(cp)
                {
                    this.count++;
                }
            }
           }

        }
        else{
            if(this.isPlay==false) return false;
            var getPoint = touch.getLocation();
            if(getPoint.x<680&&getPoint.x>117&&getPoint.y<592&&getPoint.y>27){
            this.pointX=Math.round((getPoint.x-this.startX)/this.spaceX);
            this.pointY=Math.round((getPoint.y-this.startY)/this.spaceY);
            if(this.pointX<0) this.pointX=0;
            if(this.pointX>14) this.pointX=14;
            if(this.pointY<0) this.pointY=0;
            if(this.pointY>14) this.pointY=14;
            if(this.map[this.pointX][this.pointY]==0)
            {
                this.my=-1;
                var cp=this.clickPoint(this.pointX,this.pointY,this.my);
                var baiSprite =cc.Sprite.create(s_bai);
                baiSprite.setAnchorPoint(0.45,0.6);
                baiSprite.setPosition(this.pointX*this.spaceX+this.startX,this.pointY*this.spaceY+this.startY);
                this.gameLayer.addChild(baiSprite,2);
                //定位棋子和边框
                this.pan.setPosition(this.pointX*this.spaceX+this.startX,this.pointY*this.spaceY+this.startY);
                ///////////////压入历史记录栈
                this.history.push({x:this.pointX,y:this.pointY,sprite:baiSprite});
                cc.AudioEngine.getInstance().playEffect(this.baiMusic, false);
                if(cp)
                {
                    this.count++;
                }
            }
            }
        }
        /*if(this.isPlay==false) return false;//isPlay是不能下，锁定当前棋盘
        var getPoint = touch.getLocation();
        this.pointX=Math.round((getPoint.x-this.startX)/this.spaceX);
        this.pointY=Math.round((getPoint.y-this.startY)/this.spaceY);
        if(this.pointX<0) this.pointX=0;
        if(this.pointX>14) this.pointX=14;
        if(this.pointY<0) this.pointY=0;
        if(this.pointY>14) this.pointY=14;
        //
        if(this.map[this.pointX][this.pointY]==0)
        {
        var cp=this.clickPoint(this.pointX,this.pointY,this.my);
        var blackSprite =cc.Sprite.create(s_hei);
        blackSprite.setAnchorPoint(0.45,0.6);
        blackSprite.setPosition(this.pointX*this.spaceX+this.startX,this.pointY*this.spaceY+this.startY);
        this.gameLayer.addChild(blackSprite,2);
        cc.AudioEngine.getInstance().playEffect(this.heiMusic, false);
        if(cp)
        {
            this.AIPlay();
        }
         }*/
    },
    //zhuodian
    clickPoint:function(x,y,my){
        //将棋子放入map
        this.map[x][y]=my;
        cc.log(x+","+y);
        //
        var k=0;
        var t=0;
        for(var i=0;i<15;i++)
        {
            for(var j=0;j<15;j++)
            {
                var m=this.map[i][j];
                if(m===-1)
                {
                    k++;
                }
                if(m===0)
                {
                    t++;
                }
            }
        }
        cc.log("bai"+k+" "+"kong"+t);
        //胜负判断
        cc.log("my"+my);
        if(this.isWin(x,y,my)){
            this.isPlay=false;
            setTimeout(function(){
                if (my==1){
                    alert("恭喜，黑方赢了！");
                }else{
                    alert("恭喜，白方赢了！");
                }
            }, 300);
            return false;
        }
        return true;
    },
    isWin:function(x,y,my){
        var map=this.map;
        //这里特殊说明一下，由于上面的得到xy的算法，从而使得正常的二维数组逆时针方向旋转了90度
        //横方向
        var arr=[];
        for(var i=0;i<map.length;i++)
        {
            arr.push(map[i][y]);
        }
        if(this.win(arr,my)) return true;
        //竖方向
        var arr=map[x];
        if(this.win(arr,my)) return true;
        //撇方向
        var arr=[];
        for(i=0;i<map.length;i++)
        {
            var temp=map[i][y-(x-i)];
            if(temp!==undefined)
            {
                arr.push(temp);
            }
        }
        if(this.win(arr,my)) return true;
        //捺方向
        var arr=[];
        for(i=0;i<map.length;i++)
        {
            var temp=map[i][y+(x-i)];
            if(temp!==undefined)
            {
                arr.push(temp);
            }
        }
        if(this.win(arr,my)) return true;
    },
    win:function(arr,my){
        var n=0;
        for(var i=0;i<arr.length;i++){
            if(arr[i]==my){
                n++;
                if(n==5) return true;
            }
            else{
                n=0;
            }
        }
        return false;
    }/*,
    AIPlay:function(){
        this.isPlay=false;
        this.my=-1;
        var pace=this.Ai.initData(this.map,this.my);
        //延时函数
        this.scheduleOnce(function(){
            cc.AudioEngine.getInstance().playEffect(this.baiMusic, false);
            var cp=this.clickPoint(pace.x,pace.y,this.my);
            var baiSprite =cc.Sprite.create(s_bai);
            //定位棋子和边框
            this.pan.setPosition(pace.x*this.spaceX+this.startX,pace.y*this.spaceY+this.startY);
            baiSprite.setAnchorPoint(0.45,0.6);
            baiSprite.setPosition(pace.x*this.spaceX+this.startX,pace.y*this.spaceY+this.startY);
            this.gameLayer.addChild(baiSprite,2);
            if(cp)
            {
                this.isPlay=true;
                this.my=1;
            }

        },1)//单位是秒
    }*/
})