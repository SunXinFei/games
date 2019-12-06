var AI= cc.Sprite.extend({
    All:[],
    count:0,
    firstHand : null,
    ctor:function(){
        this._super();
    },
    onEnter:function(){
        this._super();
    },
    initData:function(map,my){
        var result=this.getAlphaBeta(map,my);
        if(this.firstHand == true){
            cc.log("firstHand:"+this.firstHand);
            return {x:7,y:7};
        }else{
            return {x:result.x,y:result.y};
        }

    },
    setFirstHand : function(){
        this.firstHand = true;
    },
    setFirstHandFalse : function(){
        this.firstHand = false;
    },
    getAlphaBeta:function(map,my){
        var moves=this.getMoves(map);
        cc.log("moves"+moves.length);
        this.All.length=0;
        for(var i=0;i<moves.length;i++)
        {
            var move=moves[i];
            var x=move.x;
            var y=move.y;
            //
            map[x][y]=my;
            var val1=this.getValue(map,my,x,y);//自己评估
            //如果是对方
            map[x][y]=-my;
            var val2=this.getValue(map,-my,x,y);
            var val=val1+val2;
            this.All.push({x:x,y:y,value:val});
            map[x][y]=0;
        }
        var Max=this.All[0];
        for(var i=1;i<this.All.length;i++)
        {
            if(this.All[i].value>=Max.value)
            {
                Max=this.All[i];
            }
        }
        cc.log(Max);
        if(Max!=null)
        {
        return Max;
        }
    },
    getValue:function(map,my,x,y){
        var val =Math.floor(Math.random()*2);//让AI走棋增加随机元素0-1
        var pur=14;//fanwei
        var len=15;
        //评估棋局，根据棋子形态得到valu
        var value={
            11:1,//一边被拦截的单子
            12:2,//两边都不拦截的单子

            21:10,//眠二
            22:20,//活二

            31:30,//眠三
            //双活二 40分
            32:50,//活三

            41:60,//眠四或者冲四
            //死三活三70分
            //双活三80分
            //活四，双死四，死四活三90分
            42:100,//活四

            50:88888,//两边被拦截的五子
            51:88888,//一边被拦截的五子
            52:88888//两边都不被拦截的五子
        };
        //左方向
        var A={};
        A.n=1;
        A.v=0;
        for(var i=1;i<len;i++)
        {
            var  _x=x-i;
            if(dis(_x,y,my)==false) break;
        }
        //右方向
        for(var i=1;i<len;i++)
        {
            var _x=x+i;
            if(dis(_x,y,my)==false) break;
        }
        //结算横着的方向A.n就是几个自己的子，A.v就是几个空棋子位
        if(A.n>5) A.n=5;
        val +=value[A.n*10+ A.v]||0;

        //上
        A.n=1;
        A.v=0;
        for(var i=1;i<len;i++)
        {
            var _y=y+i;
            if(dis(x,_y,my)==false) break;
        }
        //下
        for(var i=1;i<len;i++)
        {
            var _y=y-i;
            if(dis(x,_y,my)==false) break;
        }
        if(A.n>5) A.n=5;
        val+=value[A.n*10+ A.v]||0;

        //一点半钟方向
        A.n=1;
        A.v=0;
        for(var i=1;i<len;i++){
            var _x=x+i;
            var _y=y+i;
            if(dis(_x,_y,my)==false) break;
        }
        //七点半钟方向
        for(var i=1;i<len;i++)
        {
            var _x=x-i;
            var _y=y-i;
            if(dis(_x,_y,my)==false) break;
        }
        if(A.n>5) A.n=5;
        val+=value[A.n*10+ A.v]||0;

        //十点半钟方向
        A.n=1;
        A.v=0;
        for(var i=1;i<len;i++){
            var _x=x-i;
            var _y=y+i;
            if(dis(_x,_y,my)==false) break;
        }
        //四点半钟方向
        for(var i=1;i<len;i++){
            var _x=x+i;
            var _y=y-i;
            if(dis(_x,_y,my)==false) break;
        }
        if(A.n>5) A.n=5;
        val+=value[A.n*10+ A.v]||0;
        return val;
        function dis(x,y,my){
            if (x < 0 || x >14 || y < 0 || y >14){
                return false;
            }
            var m=map[x][y];
            if(m==my)
            {
                A.n++;
                return true;
            }
            else{
                if(m==0) A.v++;
                return false;
            }
        }
    },
    getMoves:function(map){
        var moves=[];
        moves.length=0;
        for(var i=0;i<15;i++)
        {
            for(var j=0;j<15;j++)
            {
                var m=map[i][j];
                if(m===0)
                {
                    moves.push({x:i,y:j});
                }
            }
        }
        cc.log("moves.length"+moves.length);
        return moves;
    }
})