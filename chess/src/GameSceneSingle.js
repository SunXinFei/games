var GameSceneSingle = cc.Scene.extend({
    argList:[],//所有棋子数组
    cloud:[],//云数组
    whichArg:100,//用来记录点击的哪个棋子
    /*touchBegin:1,//0本阵营不能走  1可以走*/
    touchBegin:1,//1白子走 -1黑子走
    net:null,
    maoSprite:null,
    chenSprite:null,
    board:[
    ],//地图
    eat:['-3.-4','-4.-3','0.15','0.8','1.8','1.9','2.8','2.9','2.10','3.8','3.9','3.10','3.11','4.8','4.9','4.10','4.11','4.12','5.8','5.9','5.10','5.12','5.13','6.8','6.9','6.10','6.11','6.12','6.13','6.14','7.9','7.10','7.11','7.12','7.13','7.14','7.15','8.0','8.7','9.0','9.1','10.0','10.1','10.2','11.0','11.1','11.2','11.3','12.0','12.1','12.2','12.3','12.4','13.0','13.1','13.2','13.3','13.4','13.5','14.0','14.1','14.2','14.3','14.4','14.5','14.6','15.1','15.2','15.3','15.4','15.5','15.6','15.7'],
    gameLayer:null,
    blackArg:0,
    whiteArg:0,
    hook:['2.0','3.1','4.0','3.7','2.8','4.8'],//陷阱位置
    helpLayer:null,
    ctor:function(){
        this._super();
    },
    onEnter:function(){
        this._super();
        this.initDate();
        this.initEat();
        //启动主update
        /*this.schedule(this.update,1);*///参数1：执行函数，参数2：调用间隔时间，0为每帧都调用
        this.schedule(this.upWord,2.4);
        this.schedule(this.checkWinner,2.4);
    },
    //陷阱棋谱
    initEat:function(){
       for(var i=0;i<=7;i++)
       {
           for(var j=-16;j>=-23;j--)
           {
               var k=i+'.'+j;
               this.eat.push(k);
           }
       }
       for(var i=8;i<=15;i++)
       {
           for(var j=-8;j>=-15;j--)
           {
               var k=i+'.'+j;
               this.eat.push(k);
           }
       }
    },
    checkWinner:function(dt){
        this.whiteArg=8;
        for(var i=0;i<=7;i++)
        {
            if(this.argList[i].visible==false)
            {
                this.whiteArg--;
            }
        }
        if(this.whiteArg==0)
        {
            if (confirm("黑方胜利")) {
                /*location.href="play.html";*/
                window.close();
            }
            else{


            }
        }
        this.blackArg=8;
        for(var i=8;i<=15;i++)
        {
            if(this.argList[i].visible==false)
            {
                this.blackArg--;
            }
        }
        if(this.blackArg==0)
        {
            if (confirm("白方胜利")) {
                /*location.href="play.html";*/
                window.close();
            }
            else{

                }
        }
    },
    initDate:function(){
        this.board=[
            [5,-1,7,-1,-1,-1,8,-1,14],//0
            [-1,1,-1,-2,-2,-2,-1,10,-1],//1
            [-1,-1,3,-2,-2,-2,12,-1,-1],//2
            [-5,-1,-1,-1,-1,-1,-1,-1,-6],//3
            [-1,-1,4,-2,-2,-2,11,-1,-1],//4
            [-1,2,-1,-2,-2,-2,-1,9,-1],//5
            [6,-1,0,-1,-1,-1,15,-1,13]//6
    ];
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //山
        var bg0=cc.Sprite.create(s_frame0);
        bg0.setAnchorPoint(cc.p(0,0));
        bg0.setPosition(cc.p(0,0));
        this.gameLayer.addChild(bg0,0);
        //雾气
        var background_layer1=cc.Sprite.create(s_background_layer);
        var action=cc.MoveBy.create(12,cc.p(480,0));
        var action1=action.reverse();
        var moveSeq=cc.Sequence.create(action,action1)
        var moveRep=cc.RepeatForever.create(moveSeq);
        background_layer1.setAnchorPoint(cc.p(0.5,0));
        background_layer1.setPosition(cc.p(0,0));
        background_layer1.runAction(moveRep);/*
        background_layer2.runAction(moveRep.copy());*/
        this.gameLayer.addChild(background_layer1,1);
        //棋盘
        var bg1= cc.Sprite.create(s_frame1);
        bg1.setScale(0.95);
        bg1.setAnchorPoint(cc.p(0,0));
        bg1.setPosition(cc.p(5,5));
        this.gameLayer.addChild(bg1,1);
        this.argList.length=0;//////////////
        this.initcloud();
        this.initm();
        this.inits();
        this.initd();
        this.initg();
        this.initc();
        this.initt();
        this.initl();
        this.inite();
        this.initM();
        this.initS();
        this.initD();
        this.initG();
        this.initC();
        this.initT();
        this.initL();
        this.initE();
        /*this.initNet();*/

        this.initMaoChen();
        //
       this.initHelp();
        this.initMusicMenu();
        this.initHome();
    },
    initHome:function(){
        var menuItemImg = cc.MenuItemImage.create(s_home2,s_home1,this.returnHome,this);
        var menu = cc.Menu.create(menuItemImg);
        menu.setPosition(cc.p(470,240));
        this.gameLayer.addChild(menu,4);
    },
    returnHome:function(){
        this.pauseSchedulerAndActions();
        this.touchBegin=2;
        for(var i=0;i<4;i++)
        {
            this.cloud[i].setVisible(false);
            this.cloud[i].visible=false;
        }
        for(var i=0;i<=15;i++)
        {
            this.argList[i].cloudPos=0;
        }
        this.argList.length=0;
        this.cloud.length=0;
        cc.AudioEngine.getInstance().setMusicVolume(0);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new SysScene()));
    },
    initHelp:function(){
        var menuItemImg = cc.MenuItemImage.create(s_help1,s_help2,this.run,this);
        menuItemImg.setScale(0.4);
        var menu = cc.Menu.create(menuItemImg);
        menu.setPosition(cc.p(470,300));
        this.gameLayer.addChild(menu,4);
        this.helpLayer=new HelpLayer();
        this.helpLayer.setVisible(false);
        this.gameLayer.addChild(this.helpLayer,5);
    },
    run:function(){
        this.helpLayer.setVisible(true);
    },
    /*initMusic:function()
    {
        var MUSIC_FILE = "res/Sound/Music.mp3";
        cc.AudioEngine.getInstance().playMusic(MUSIC_FILE, true);
    },*/
    initMusicMenu:function(){
        var MUSIC_FILE = "res/Sound/Music.mp3";
        var music = cc.MenuItemToggle.create(
            cc.MenuItemImage.create(s_music),
            cc.MenuItemImage.create(s_nomusic)
        );
        music.setCallback(this.onSoundControl);
        var menu = cc.Menu.create(music);
        menu.setPosition(cc.p(470,270));
        this.gameLayer.addChild(menu,4);
        cc.AudioEngine.getInstance().playMusic(MUSIC_FILE, true);
        cc.AudioEngine.getInstance().setMusicVolume(1);
        cc.AudioEngine.getInstance().setEffectsVolume(1.0);
    },
    onSoundControl:function(){
        var mVol = cc.AudioEngine.getInstance().getMusicVolume();
        //console.log(mVol);
        if(mVol != 0){
            cc.AudioEngine.getInstance().setMusicVolume(0.0);
            cc.AudioEngine.getInstance().setEffectsVolume(0.01);
            cc.log(cc.AudioEngine.getInstance().getMusicVolume());
        }
        else{
            cc.AudioEngine.getInstance().setMusicVolume(1.0);
            cc.AudioEngine.getInstance().setEffectsVolume(1.0);
            cc.log(cc.AudioEngine.getInstance().getMusicVolume());
        }

    },
    upWord:function(dt){
        //白方闪烁
        if(this.touchBegin==1/*&&this.net.touchStart==1*/)
        {
            //卯变幻
            var fadeout=cc.FadeOut.create(1);
            var fadein=cc.FadeIn.create(1);
            var delaytime1 =cc.DelayTime.create(0.2);
            var delaytime2 =cc.DelayTime.create(0.2);
            var scaleSeq = cc.Sequence.create(fadeout,delaytime1,fadein,delaytime2);
            var scaleRep = cc.RepeatForever.create(scaleSeq);
            this.maoSprite.runAction(scaleRep);
        }
        //黑方闪烁
        if(this.touchBegin==-1/*&&this.net.touchStart==-1*/)
        {
            //锁定网络对手的卯
            this.maoSprite.stopAllActions();
            this.maoSprite.setScale(0.5);
            this.maoSprite.setOpacity(200);
            //辰变幻
            //卯变幻
            var fadeout=cc.FadeOut.create(1);
            var fadein=cc.FadeIn.create(1);
            var delaytime1 =cc.DelayTime.create(0.2);
            var delaytime2 =cc.DelayTime.create(0.2);
            var scaleSeq = cc.Sequence.create(fadeout,delaytime1,fadein,delaytime2);
            var scaleRep = cc.RepeatForever.create(scaleSeq);
            this.chenSprite.runAction(scaleRep);
        }
    },
    initMaoChen:function(){
        //卯
        this.maoSprite = cc.Sprite.create(s_mao);
        this.maoSprite.setPosition(cc.p(40,158));
        this.maoSprite.setScale(0.5);
        this.maoSprite.setOpacity(200);
        this.gameLayer.addChild(this.maoSprite,1);
        //辰
        this.chenSprite = cc.Sprite.create(s_chen);
        this.chenSprite.setPosition(cc.p(430,158));
        this.chenSprite.setScale(0.5);
        this.chenSprite.setOpacity(200);
        this.gameLayer.addChild(this.chenSprite,1);
    },
    initcloud:function(){
        this.cloud.length=0;
        for(var i=0;i<4;i++)
        {
            var c= new WhiteCloudSpriteSingle();
            this.cloud.push(c);
            c.gameScene2=this;
            c.setScale(0.1);
            this.gameLayer.addChild(c,2);
        }
        cc.log(this.cloud.length+"wwwww");
    },
    //mouse
    initm:function(){
        var m= new mSpriteSingle();
        m.setScale(0.4);
        m.setPosition(cc.p(136,38));
        m.gameScene1 =this;
        this.gameLayer.addChild(m,3);
        this.argList.push(m);
        m.cloudPos.length=0;////////////////////
    },
    inits:function(){
        var s=new sSpriteSingle();
        s.setScale(0.4);
        s.setPosition(cc.p(86,238));
        s.gameScene1 =this;
        this.gameLayer.addChild(s,3);
        this.argList.push(s);
        s.cloudPos.length=0;
    },
    initd:function(){
        var d=new dSpriteSingle();
        d.setScale(0.4);
        d.setPosition(cc.p(86,78));
        d.gameScene1 =this;
        this.gameLayer.addChild(d,3);
        this.argList.push(d);
        d.cloudPos.length=0;
    },
    initg:function(){
        var g=new gSpriteSingle();
        g.setScale(0.4);
        g.setPosition(cc.p(136,198));
        g.gameScene1 =this;
        this.gameLayer.addChild(g,3);
        this.argList.push(g);
        g.cloudPos.length=0;
    },
    initc:function(){
        var c=new cSpriteSingle();
        c.setScale(0.4);
        c.setPosition(cc.p(136,118));
        c.gameScene1 =this;
        this.gameLayer.addChild(c,3);
        this.argList.push(c);
        c.cloudPos.length=0;
    },
    initt:function(){
        var t=new tSpriteSingle();
        t.setScale(0.4);
        t.setPosition(cc.p(36,278));
        t.gameScene1 =this;
        this.gameLayer.addChild(t,3);
        this.argList.push(t);
        t.cloudPos.length=0;
    },
    initl:function(){
        var l=new lSpriteSingle();
        l.setScale(0.4);
        l.setPosition(cc.p(36,38));
        l.gameScene1 =this;
        this.gameLayer.addChild(l,3);
        this.argList.push(l);
        l.cloudPos.length=0;
    },
    inite:function(){
        var e=new eSpriteSingle();
        e.setScale(0.4);
        e.setPosition(cc.p(136,278));
        e.gameScene1 =this;
        this.gameLayer.addChild(e,3);
        this.argList.push(e);
        e.cloudPos.length=0;
    },
    initM:function(){
        var M=new MSpriteSingle();
        M.setScale(0.4);
        M.setFlippedX(true);
        M.setPosition(cc.p(336,278));
        M.gameScene1 =this;
        this.gameLayer.addChild(M,3);
        this.argList.push(M);
        M.cloudPos.length=0;
    },
    initS:function(){
        var S=new SSpriteSingle();
        S.setScale(0.4);
        S.setFlippedX(true);
        S.setPosition(cc.p(386,78));
        S.gameScene1 =this;
        this.gameLayer.addChild(S,3);
        this.argList.push(S);
        S.cloudPos.length=0;
    },
    initD:function(){
        var D=new DSpriteSingle();
        D.setScale(0.4);
        D.setFlippedX(true);
        D.setPosition(cc.p(386,238));
        D.gameScene1 =this;
        this.gameLayer.addChild(D,3);
        this.argList.push(D);
        D.cloudPos.length=0;
    },
    initG:function(){
        var G=new GSpriteSingle();
        G.setScale(0.4);
        G.setFlippedX(true);
        G.setPosition(cc.p(336,118));
        G.gameScene1 =this;
        this.gameLayer.addChild(G,3);
        this.argList.push(G);
        G.cloudPos.length=0;
    },
    initC:function(){
        var C=new CSpriteSingle();
        C.setScale(0.4);
        C.setFlippedX(true);
        C.setPosition(cc.p(336,198));
        C.gameScene1 =this;
        this.gameLayer.addChild(C,3);
        this.argList.push(C);
        C.cloudPos.length=0;
    },
    initT:function(){
        var T=new TSpriteSingle();
        T.setScale(0.4);
        T.setFlippedX(true);
        T.setPosition(cc.p(436,38));
        T.gameScene1 =this;
        this.gameLayer.addChild(T,3);
        this.argList.push(T);
        T.cloudPos.length=0;
    },
    initL:function(){
        var L=new LSpriteSingle();
        L.setScale(0.4);
        L.setFlippedX(true);
        L.setPosition(cc.p(436,278));
        L.gameScene1 =this;
        this.gameLayer.addChild(L,3);
        this.argList.push(L);
        L.cloudPos.length=0;
    },
    initE:function(){
        var E=new ESpriteSingle();
        E.setScale(0.4);
        E.setFlippedX(true);
        E.setPosition(cc.p(336,38));
        E.gameScene1 =this;
        this.gameLayer.addChild(E,3);
        this.argList.push(E);
        E.cloudPos.length=0;
    }
})