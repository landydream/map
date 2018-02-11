var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Vo_Hero = (function (_super) {
    __extends(Vo_Hero, _super);
    function Vo_Hero() {
        var _this = _super.call(this) || this;
        _this.currencyInfo = {}; //其他货币数据
        return _this;
    }
    Vo_Hero.prototype.parseDetail = function (bytes) {
        var self = this;
        self.id = bytes.readLong();
        self.name = bytes.readUTF();
        self.level = bytes.readShort();
        self.exp = bytes.readLong();
        self.job = bytes.readByte();
        self.sex = bytes.readByte();
        self.gold = bytes.readLong();
        self.bindGold = bytes.readLong();
        self.silver = bytes.readLong();
        self.viplv = bytes.readByte();
        self.str = bytes.readLong();
        self.monthCard = bytes.readByte();
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var type = bytes.readByte();
            var val = bytes.readInt();
            self.partsData[type] = val;
        }
    };
    Vo_Hero.prototype.createTestData = function () {
        var self = this;
        self.id = 111;
        self.name = '测试2';
        self.level = 10;
        self.exp = 0;
        self.job = 1;
        self.sex = 1;
        self.gold = 0;
        self.bindGold = 0;
        self.silver = 0;
        self.viplv = 0;
        self.str = 0;
        self.monthCard = 0;
    };
    /**根据类型获取货币数量 */
    Vo_Hero.prototype.getMoney = function (type) {
        var num = 0;
        if (type == Enum_Attr.yuanBao) {
            num = this.gold;
        }
        else if (type == Enum_Attr.bindYuanBao) {
            num = this.gold + this.bindGold;
        }
        else if (type == Enum_Attr.yinLiang) {
            num = this.silver;
        }
        else {
            if (this.currencyInfo[type]) {
                num = this.currencyInfo[type];
            }
        }
        return num;
    };
    return Vo_Hero;
}(Vo_Player));
__reflect(Vo_Hero.prototype, "Vo_Hero");
//# sourceMappingURL=Vo_Hero.js.map