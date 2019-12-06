var HelpLayer = cc.Layer.extend({
    layer:null,
    ctor:function(){
        this._super();
        this.initDate();
    },
    initDate:function () {
       this.layer=cc.LayerColor.create(cc.c4b(0,0,0,0));
        this.layer.setOpacity(100);
        this.addChild(this.layer);
        var winSize=cc.Director.getInstance().getWinSize();
            // There is a bug in LabelTTF native. Apparently it fails with some unicode chars.
            var about = cc.LabelTTF.create("1.每个棋子都有一个级别.一个棋子可以吃掉和自己等级一样或者比自\n" +
                                           "己等级小的棋子.象>狮>虎>牛>羊>狗>蛇>鼠,唯一的例外是最小的鼠可\n" +
                                           "以吃掉最大的象.\n" +
                                           "2.点一下棋子,你会看到几朵云出现。它们指示出棋子可以移动到的格\n" +
                                           "子.\n"+
                                           "3.黑白双方各有一个巢穴卯与辰.巢穴由三个陷阱围绕着.只要将你的\n"+
                                           "任意一个棋子移动到对方的巢穴里,或者吃光对方棋子,就能取得胜利.\n" +
                                           "卯或辰字的闪烁,是在提醒该你了哦.\n"+
                                           "4.你得当心,当你的棋子在陷阱里时,对方任意一个棋子都能吃掉你.\n"+
                                           "5.只有鼠可以进入棋盘中间的特殊区域,也就是河.但是鼠在河里不能\n" +
                                           "吃象.两只鼠都在河里时,它们可以互吃.\n"+
                                           "6.狮和虎都能垂直或水平地跳过河,但当有鼠在河中挡在跳跃路线上时\n" +
                                           "它们就跳不过去了.\n"
                                          +"7.免责声明:图片来源于网络,关于图片的相关责任,软件作者不负任何\n责任\n"+
                                           "8.如有疑问或建议请联系作者mingzihaonan1314@163.com",
                "楷体", 14, cc.size(winSize.width * 0.9, 320), cc.TEXT_ALIGNMENT_LEFT );
            about.setPosition(winSize.width / 2,  winSize.height/2 -20 );
            about.setAnchorPoint( cc.p(0.5, 0.5) );
            this.layer.addChild(about);

            var label = cc.LabelTTF.create("继续游戏", "楷体", 20);
            var back = cc.MenuItemLabel.create(label,this.onBackCallback,this);
            var menu = cc.Menu.create(back);
            menu.setPosition( winSize.width / 2, 15);
            this.layer.addChild(menu);
    },
    onBackCallback:function () {
        this.setVisible(false);
    }
});