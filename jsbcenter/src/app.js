
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        //开始执行吧 少年们
        //只有在native才需要进行复制
        if(!cc.sys.isNative){
            cc.log("只能在Native下使用");
            return true;
        }
        this._db = new sql.SQLiteWrapper();
        this._dbPath = this._db.initializing("data.db","res","");

        this._isOpen = this._db.open(this._dbPath);

        cc.log("数据库打开结果:" + this._isOpen?"已打开...":"未打开...");

        if(this._isOpen){
            var st = this._db.statement("select * from equip");

            var ary = [];
            while(st.nextRow()){
                var equipVO = new CEquipVO();
                equipVO.wid = parseInt(st.valueString(0));
                equipVO.name = st.valueString(1);
                equipVO.desc = st.valueString(2);
                equipVO.level = st.valueString(3);
                equipVO.icon = st.valueString(4);
                equipVO.quality = st.valueString(5);
                ary.push(equipVO);
            }

            for(var vo in ary){
                cc.log("equipData:" + ary[vo].toString());
            }
        }
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

var CEquipVO = cc.Class.extend({
    wid:null,//like 10000001
    name:null,//like 银票
    level:null,//like 1
    type:null,//like 1
    price:null,//like 200
    stackCount:null,//like 99
    bind:null,//like 1
    desc:null,//like 加银两
    quality:null,//like 1
    icon:null,//like item/article/10000001.png
    toString:function(){
        return this.wid + " " + this.name + " " + this.level + " " + this.desc + " " + this.icon;
    }
});

