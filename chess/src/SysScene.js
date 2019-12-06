var SysScene =cc.Scene.extend({
    gameLayer:null,
    onEnter:function(){
        this._super();
        this.initDate();
    },
    initDate:function(){
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);

        var bg0= cc.Sprite.create(s_frame0);
        bg0.setAnchorPoint(cc.p(0,0));
        bg0.setPosition(cc.p(0,0));
        this.gameLayer.addChild(bg0,0);
        //标题
        var bg1= cc.Sprite.create(s_choose);
        bg1.setPosition(cc.p(240,400));
        this.gameLayer.addChild(bg1,1);
        var moveto=cc.MoveTo.create(1.5,cc.p(240,239));
        var fadein=cc.FadeIn.create(1.5);
        bg1.runAction(moveto);
        //菜单
        /*var menuItemImg1 = cc.MenuItemImage.create(s_button1,s_button1,this.repScene,this);
        var menuItemImg2 = cc.MenuItemImage.create(s_button2,s_button2,this.repSceneSingle,this);
        var menu=cc.Menu.create(menuItemImg1,menuItemImg2);*/
        var menuLabel1=cc.LabelTTF.create("联网游戏","华文琥珀",25);
        var menuItem1=cc.MenuItemLabel.create(menuLabel1,this.repScene,this);
        var menuLabel2=cc.LabelTTF.create("单机双人","华文琥珀",25);
        var menuItem2=cc.MenuItemLabel.create(menuLabel2,this.repSceneSingle,this);
        menuLabel1.setColor(cc.c3(255,204,0));
        menuLabel2.setColor(cc.c3(255,204,0));
        var menu = cc.Menu.create(menuItem1,menuItem2);
        menu.alignItemsInColumns(2,1);
        menu.runAction(fadein);
        this.gameLayer.addChild(menu,2);

    },
    //切换场景特效
    repScene:function()
    {
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new GameScene()));
    },
    //切换场景特效
    repSceneSingle:function()
    {
        /*var gameScene =new GameSceneSingle();*/
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new GameSceneSingle()));
    }
});