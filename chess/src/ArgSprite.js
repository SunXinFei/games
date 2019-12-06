var ArgSprite = cc.Sprite.extend({
    my:0,//阵营1bai-1hei
    gameScene1:null,//gameScene属性用来传入GameScene
    cloudPos:[],//能走得位置
    visible:true,
    ctor:function(){
        this._super();
        this.initDate();
        cc.registerTargetedDelegate(this._touchPriority, true, this);
    },
    initDate:function(){

    },
    check:function(){
        this.cloudPos.length=0;/////////
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[(this.line-1)]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[(this.line-1)][this.row];
            cc.log('s'+texts);

        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);

        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined)
        {
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);

        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0)
        {
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);

        }else{textz='null'}
        if(this.gameScene1.argList[arg].my==1)//白色
        {
            //上
            if((this.gameScene1.board[this.line-1]!==undefined &&(this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-6))||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            //右
            if(((this.row+1<=8)&&(this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-6)||this.in_array(texty,this.gameScene1.eat)==true))
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            //下
            if((this.gameScene1.board[this.line+1]!==undefined && (this.gameScene1.board[this.line+1][this.row]==-6||this.gameScene1.board[this.line+1][this.row]==-1))||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            //左
            if(((this.row-1>=0)&&(this.gameScene1.board[this.line][this.row-1]==-6||this.gameScene1.board[this.line][this.row-1]==-1))||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
        }
        //heise
        if(this.gameScene1.argList[arg].my==-1)//heise
        {
            //上
            if((this.gameScene1.board[this.line-1]!==undefined &&(this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-5))||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            //右
            if(this.row+1<=8&&(this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-5)||this.in_array(texty,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            //下
            if((this.gameScene1.board[this.line+1]!==undefined && (this.gameScene1.board[this.line+1][this.row]==-5||this.gameScene1.board[this.line+1][this.row]==-1))||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            //左
            if(((this.row-1>=0)&&(this.gameScene1.board[this.line][this.row-1]==-5||this.gameScene1.board[this.line][this.row-1]==-1))||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
        }

    },
    in_array:function(stringToSearch, arrayToSearch) {
        for (s = 0; s < arrayToSearch.length; s++) {
            thisEntry = arrayToSearch[s];
            if (thisEntry == stringToSearch) {
                return true;
            }
        }
        return false;
    }
});
//白方
//mouse
var mSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Mouse: "res/Sound/Mouse.mp3",
    history:-1,//给老鼠一个特殊的history,用来判断老鼠是否在陆地 -1陆地 -2水中
    value:0,//用来棋谱互吃判断
    historyIs:0,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_m);
    },
    initDate:function(){
        this.my = 1;
    },
    checkWalk:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //
        //
        //上
        if(this.gameScene1.board[this.line-1]!==undefined &&(this.gameScene1.board[this.line-1][this.row]==-6||this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-2)||this.in_array(texts,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:(this.line-1),row:this.row});
        }
        //右
        if((this.row+1<=8)&&(this.gameScene1.board[this.line][this.row+1]==-6||this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-2)||this.in_array(texty,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line,row:this.row+1});
        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined && (this.gameScene1.board[this.line+1][this.row]==-6||this.gameScene1.board[this.line+1][this.row]==-1||this.gameScene1.board[this.line+1][this.row]==-2)||this.in_array(textx,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line+1,row:this.row});
        }
        //左
        if((this.row-1>=0)&&(this.gameScene1.board[this.line][this.row-1]==-6||this.gameScene1.board[this.line][this.row-1]==-1||this.gameScene1.board[this.line][this.row-1]==-2)||this.in_array(textz,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line,row:this.row-1});
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Mouse, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=0;
            this.checkWalk();
            for(var i=0;i<this.cloudPos.length;i++)
            {

                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});

//snake
var sSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Snake: "res/Sound/Snake.mp3",
    value:1,//用来棋谱互吃判断
    historyIs:1,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_s);
    },
    initDate:function(){
        this.my = 1;
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Snake, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=1;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//dog
var dSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Dog: "res/Sound/Dog.mp3",
    value:2,//用来棋谱互吃判断
    historyIs:2,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_d);
    },
    initDate:function(){
        this.my = 1;
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Dog, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=2;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//goat
var gSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Goat: "res/Sound/Goat.mp3",
    value:3,//用来棋谱互吃判断
    historyIs:3,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_g);

    },
    initDate:function(){
        this.my = 1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Goat, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=3;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//cow
var cSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Cow: "res/Sound/Cow.mp3",
    value:4,//用来棋谱互吃判断
    historyIs:4,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_c);

    },
    initDate:function(){
        this.my = 1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Cow, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=4;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//tiger
var tSprite =ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Tiger: "res/Sound/Tiger.mp3",
    value:5,//用来棋谱互吃判断
    historyIs:5,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_t);

    },
    initDate:function(){
        this.my = 1;

    },
    checktl:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //上
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            if((this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-6)||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            if(this.gameScene1.board[this.line-1][this.row]==-2)//上面是河
            {
                var textss=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-3][this.row];
                cc.log('ss'+textss);
                if(this.gameScene1.board[this.line-2][this.row]==-2&&((this.gameScene1.board[this.line-3][this.row]==-1)||this.in_array(textss,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:(this.line-3),row:this.row});
                }
            }
        }
        //右
        if(this.row+1<=8)
        {
            if(this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-6||this.in_array(texty,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            if(this.gameScene1.board[this.line][this.row+1]==-2)//右边是河
            {
                var textyy=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+4];
                cc.log('yy'+textyy);
                if(this.gameScene1.board[this.line][this.row+2]==-2&&this.gameScene1.board[this.line][this.row+3]==-2&&(this.gameScene1.board[this.line][this.row+4]==-1||this.in_array(textyy,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row+4});
                }
            }

        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined)
        {
            if(this.gameScene1.board[this.line+1][this.row]==-1||this.gameScene1.board[this.line+1][this.row]==-6||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            if(this.gameScene1.board[this.line+1][this.row]==-2)
            {
                var textxx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+3][this.row];
                cc.log('xx'+textxx);
                if(this.gameScene1.board[this.line+2][this.row]==-2&&(this.gameScene1.board[this.line+3][this.row]==-1||this.in_array(textxx,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line+3,row:this.row});
                }
            }
        }
        //左
        if(this.row-1>=0)
        {
            if(this.gameScene1.board[this.line][this.row-1]==-1||this.gameScene1.board[this.line][this.row-1]==-6||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
            if(this.gameScene1.board[this.line][this.row-1]==-2)
            {
                var textzz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-4];
                cc.log('zz'+textzz);
                if(this.gameScene1.board[this.line][this.row-2]==-2&&this.gameScene1.board[this.line][this.row-3]==-2&&(this.gameScene1.board[this.line][this.row-4]==-1||this.in_array(textzz,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row-4});
                }
            }
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Tiger, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=5;
            this.checktl();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//line
var lSprite =ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Lion: "res/Sound/Lion.mp3",
    value:6,//用来棋谱互吃判断
    historyIs:6,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_l);

    },
    initDate:function(){
        this.my = 1;

    },
    checktl:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //上
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            if((this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-6)||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            if(this.gameScene1.board[this.line-1][this.row]==-2)//上面是河
            {
                var textss=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-3][this.row];
                cc.log('ss'+textss);
                if(this.gameScene1.board[this.line-2][this.row]==-2&&((this.gameScene1.board[this.line-3][this.row]==-1)||this.in_array(textss,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:(this.line-3),row:this.row});
                }
            }
        }
        //右
        if(this.row+1<=8)
        {
            if(this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-6||this.in_array(texty,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            if(this.gameScene1.board[this.line][this.row+1]==-2)//右边是河
            {
                var textyy=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+4];
                cc.log('yy'+textyy);
                if(this.gameScene1.board[this.line][this.row+2]==-2&&this.gameScene1.board[this.line][this.row+3]==-2&&(this.gameScene1.board[this.line][this.row+4]==-1||this.in_array(textyy,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row+4});
                }
            }

        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined)
        {
            if(this.gameScene1.board[this.line+1][this.row]==-1||this.gameScene1.board[this.line+1][this.row]==-6||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            if(this.gameScene1.board[this.line+1][this.row]==-2)
            {
                var textxx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+3][this.row];
                cc.log('xx'+textxx);
                if(this.gameScene1.board[this.line+2][this.row]==-2&&(this.gameScene1.board[this.line+3][this.row]==-1||this.in_array(textxx,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line+3,row:this.row});
                }
            }
        }
        //左
        if(this.row-1>=0)
        {
            if(this.gameScene1.board[this.line][this.row-1]==-1||this.gameScene1.board[this.line][this.row-1]==-6||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
            if(this.gameScene1.board[this.line][this.row-1]==-2)
            {
                var textzz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-4];
                cc.log('zz'+textzz);
                if(this.gameScene1.board[this.line][this.row-2]==-2&&this.gameScene1.board[this.line][this.row-3]==-2&&(this.gameScene1.board[this.line][this.row-4]==-1||this.in_array(textzz,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row-4});
                }
            }
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Lion, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=6;
            this.checktl();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//elephant
var eSprite =ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Elephant : "res/Sound/Elephant.mp3",
    value:7,//用来棋谱互吃判断
    historyIs:7,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_e);

    },
    initDate:function(){
        this.my = 1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Elephant, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=7;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }
    },
    onTouchEnded:function(touch,event)
    {

    }
});
//
//
//
//黑方
//mouse
var MSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Mouse: "res/Sound/Mouse.mp3",
    history:-1,/************/
    value:8,//用来棋谱互吃判断
    historyIs:8,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_M);

    },
    initDate:function(){
        this.my = -1;

    },
    checkWalk:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //上
        if(this.gameScene1.board[this.line-1]!==undefined &&(this.gameScene1.board[this.line-1][this.row]==-5||this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-2)||this.in_array(texts,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:(this.line-1),row:this.row});
        }
        //右
        if((this.row+1<=8)&&(this.gameScene1.board[this.line][this.row+1]==-5||this.gameScene1.board[this.line][this.row+1]==-1||this.gameScene1.board[this.line][this.row+1]==-2)||this.in_array(texty,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line,row:this.row+1});
        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined && (this.gameScene1.board[this.line+1][this.row]==-5||this.gameScene1.board[this.line+1][this.row]==-1||this.gameScene1.board[this.line+1][this.row]==-2)||this.in_array(textx,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line+1,row:this.row});
        }
        //左
        if((this.row-1>=0)&&(this.gameScene1.board[this.line][this.row-1]==-5||this.gameScene1.board[this.line][this.row-1]==-1||this.gameScene1.board[this.line][this.row-1]==-2)||this.in_array(textz,this.gameScene1.eat)==true)
        {
            this.cloudPos.push({line:this.line,row:this.row-1});
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Mouse, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=8;
            this.checkWalk();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//snake
var SSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Snake: "res/Sound/Snake.mp3",
    value:9,//用来棋谱互吃判断
    historyIs:9,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_S);

    },
    initDate:function(){
        this.my = -1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Snake, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=9;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//dog
var DSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Dog: "res/Sound/Dog.mp3",
    value:10,//用来棋谱互吃判断
    historyIs:10,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_D);

    },
    initDate:function(){
        this.my = -1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Dog, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=10;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//goat
var GSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Goat: "res/Sound/Goat.mp3",
    value:11,//用来棋谱互吃判断
    historyIs:11,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_G);

    },
    initDate:function(){
        this.my = -1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Goat, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=11;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//cow
var CSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Cow: "res/Sound/Cow.mp3",
    value:12,//用来棋谱互吃判断
    historyIs:12,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_C);

    },
    initDate:function(){
        this.my = -1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Cow, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=12;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//tiger
var TSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Tiger: "res/Sound/Tiger.mp3",
    value:13,//用来棋谱互吃判断
    historyIs:13,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_T);

    },
    initDate:function(){
        this.my = -1;

    },
    checktl:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //上
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            if((this.gameScene1.board[this.line-1][this.row]==-1||this.gameScene1.board[this.line-1][this.row]==-5)||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            if(this.gameScene1.board[this.line-1][this.row]==-2)//上面是河
            {
                var textss=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-3][this.row];
                cc.log('ss'+textss);
                if(this.gameScene1.board[this.line-2][this.row]==-2&&((this.gameScene1.board[this.line-3][this.row]==-1)||this.in_array(textss,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:(this.line-3),row:this.row});
                }
            }
        }
        //右
        if(this.row+1<=8)
        {
            if(this.gameScene1.board[this.line][this.row+1]==-5||this.gameScene1.board[this.line][this.row+1]==-1||this.in_array(texty,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            if(this.gameScene1.board[this.line][this.row+1]==-2)//右边是河
            {
                var textyy=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+4];
                cc.log('yy'+textyy);
                if(this.gameScene1.board[this.line][this.row+2]==-2&&this.gameScene1.board[this.line][this.row+3]==-2&&(this.gameScene1.board[this.line][this.row+4]==-1||this.in_array(textyy,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row+4});
                }
            }

        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined)
        {
            if(this.gameScene1.board[this.line+1][this.row]==-5||this.gameScene1.board[this.line+1][this.row]==-1||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            if(this.gameScene1.board[this.line+1][this.row]==-2)
            {
                var textxx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+3][this.row];
                cc.log('xx'+textxx);
                if(this.gameScene1.board[this.line+2][this.row]==-2&&(this.gameScene1.board[this.line+3][this.row]==-1||this.in_array(textxx,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line+3,row:this.row});
                }
            }
        }
        //左
        if(this.row-1>=0)
        {
            if(this.gameScene1.board[this.line][this.row-1]==-5||this.gameScene1.board[this.line][this.row-1]==-1||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
            if(this.gameScene1.board[this.line][this.row-1]==-2)
            {
                var textzz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-4];
                cc.log('zz'+textzz);
                if(this.gameScene1.board[this.line][this.row-2]==-2&&this.gameScene1.board[this.line][this.row-3]==-2&&(this.gameScene1.board[this.line][this.row-4]==-1||this.in_array(textzz,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row-4});
                }
            }
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Tiger, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=13;
            this.checktl();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//lion
var LSprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Lion: "res/Sound/Lion.mp3",
    value:14,//用来棋谱互吃判断
    historyIs:14,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_L);

    },
    initDate:function(){
        this.my = -1;

    },
    checktl:function(){
        this.cloudPos.length=0;
        var x=this.getPosition().x.toFixed(0);
        var y=this.getPosition().y.toFixed(0);
        this.line=-(y-278)/40;//行
        this.row =(x-36)/50;//列
        var arg=this.gameScene1.whichArg;
        //吃子判断
        //上
        var texts;
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            texts=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-1][this.row];
            cc.log('s'+texts);
        }else{texts='null'}
        //右
        var texty;
        if(this.row+1<=8)
        {
            texty=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+1];
            cc.log('y'+texty);
        }else{texty='null'}
        //下
        var textx;
        if(this.gameScene1.board[this.line+1]!==undefined){
            textx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+1][this.row];
            cc.log('x'+textx);
        }else{textx='null'}
        //左
        var textz;
        if(this.row-1>=0){
            textz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-1];
            cc.log('z'+textz);
        }else(textz='null')
        //上
        if(this.gameScene1.board[this.line-1]!==undefined)
        {
            if((this.gameScene1.board[this.line-1][this.row]==-5||this.gameScene1.board[this.line-1][this.row]==-1)||this.in_array(texts,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:(this.line-1),row:this.row});
            }
            if(this.gameScene1.board[this.line-1][this.row]==-2)//上面是河
            {
                var textss=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line-3][this.row];
                cc.log('ss'+textss);
                if(this.gameScene1.board[this.line-2][this.row]==-2&&((this.gameScene1.board[this.line-3][this.row]==-1)||this.in_array(textss,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:(this.line-3),row:this.row});
                }
            }
        }
        //右
        if(this.row+1<=8)
        {
            if(this.gameScene1.board[this.line][this.row+1]==-5||this.gameScene1.board[this.line][this.row+1]==-1||this.in_array(texty,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row+1});
            }
            if(this.gameScene1.board[this.line][this.row+1]==-2)//右边是河
            {
                var textyy=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row+4];
                cc.log('yy'+textyy);
                if(this.gameScene1.board[this.line][this.row+2]==-2&&this.gameScene1.board[this.line][this.row+3]==-2&&(this.gameScene1.board[this.line][this.row+4]==-1||this.in_array(textyy,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row+4});
                }
            }

        }
        //下
        if(this.gameScene1.board[this.line+1]!==undefined)
        {
            if(this.gameScene1.board[this.line+1][this.row]==-5||this.gameScene1.board[this.line+1][this.row]==-1||this.in_array(textx,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line+1,row:this.row});
            }
            if(this.gameScene1.board[this.line+1][this.row]==-2)
            {
                var textxx=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line+3][this.row];
                cc.log('xx'+textxx);
                if(this.gameScene1.board[this.line+2][this.row]==-2&&(this.gameScene1.board[this.line+3][this.row]==-1||this.in_array(textxx,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line+3,row:this.row});
                }
            }
        }
        //左
        if(this.row-1>=0)
        {
            if(this.gameScene1.board[this.line][this.row-1]==-5||this.gameScene1.board[this.line][this.row-1]==-1||this.in_array(textz,this.gameScene1.eat)==true)
            {
                this.cloudPos.push({line:this.line,row:this.row-1});
            }
            if(this.gameScene1.board[this.line][this.row-1]==-2)
            {
                var textzz=this.gameScene1.argList[arg].value+'.'+this.gameScene1.board[this.line][this.row-4];
                cc.log('zz'+textzz);
                if(this.gameScene1.board[this.line][this.row-2]==-2&&this.gameScene1.board[this.line][this.row-3]==-2&&(this.gameScene1.board[this.line][this.row-4]==-1||this.in_array(textzz,this.gameScene1.eat)==true))
                {
                    this.cloudPos.push({line:this.line,row:this.row-4});
                }
            }
        }
    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Lion, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=14;
            this.checktl();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});
//elephant
var ESprite = ArgSprite.extend({
    line:0,
    row:0,
    myRect:null,
    Elephant : "res/Sound/Elephant.mp3",
    value:15,//用来棋谱互吃判断
    historyIs:15,//用来陷阱的
    ctor:function(){
        this._super();
        this.initDate();
        this.initWithFile(s_E);

    },
    initDate:function(){
        this.my = -1;

    },
    onTouchBegan:function(touch,event){
        if(this.visible==false)
        {
            this.myRect =cc.rect(0,0,0,0);
        }
        else
        {
            this.myRect =cc.rect(this.getPosition().x-25,this.getPosition().y-20,50,40);
        }
        var getPoint = touch.getLocation();
        if(cc.rectContainsPoint(this.myRect,getPoint)&&this.gameScene1.net.touchStart==-1&&this.gameScene1.touchBegin==1)
        {
            cc.AudioEngine.getInstance().playEffect(this.Elephant, false);
            //循环遍历让云数组消失
            for(var i=0;i<this.cloudPos.length;i++)
            {
                this.gameScene1.cloud[i].setVisible(false);
                this.gameScene1.cloud[i].visible=false;
            }
            this.gameScene1.whichArg=15;
            this.check();
            for(var i=0;i<this.cloudPos.length;i++)
            {
                var l=this.cloudPos[i].line;
                var r=this.cloudPos[i].row;
                this.gameScene1.cloud[i].setPosition(cc.p(r*50+36,278-l*40));
                var fadein=cc.FadeIn.create(0.5);
                this.gameScene1.cloud[i].runAction(fadein);
                this.gameScene1.cloud[i].setVisible(true);
                this.gameScene1.cloud[i].visible=true;
            }
        }

    },
    onTouchEnded:function(touch,event)
    {

    }
});