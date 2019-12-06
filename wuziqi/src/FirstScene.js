var FirstLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        //this.init();
    },
    init:function () {
        this._super();
        var s = cc.Director.getInstance().getWinSize();

        var loadLayer = cc.Layer.create();
        this.addChild(loadLayer);

        var bg0=cc.Sprite.create(s_bg0);
        bg0.setAnchorPoint(0.25,0);
        bg0.setPosition(0,0);
        bg0.setScale(2.3);
        loadLayer.addChild(bg0,0);

        var bg1 = cc.Sprite.create(s_initbg2);
        bg1.setPosition(s.width/2,s.height/2);
        bg1.setScale(1.3);
        loadLayer.addChild(bg1,1);

        var bg2 = cc.Sprite.create(s_initbg1);
        loadLayer.addChild(bg2,2);
        bg2.setPosition(s.width/2,620);
        var moveBg2=cc.MoveTo.create(1,cc.p(s.width/2,520));
        bg2.runAction(moveBg2);

        // var menuLabel1 = cc.LabelTTF.create("开始游戏","arial",20);
        var menuItem1 = cc.MenuItemImage.create(s_btn2,s_btn2,this.repScene1,this);
        var menuItem2 = cc.MenuItemImage.create(s_btn1,s_btn1,this.repScene,this);
        var menu = cc.Menu.create(menuItem2,menuItem1);
        menu.alignItemsVerticallyWithPadding(40);

        loadLayer.addChild(menu,3);
    },
    repScene : function(){
        // alert(1);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1,new GameScene));
    },
    repScene1 : function(){
        // alert(1);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1,new GameScene1));
    }
});

var FirstScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FirstLayer();
        this.addChild(layer);
        layer.init();
    }
});
