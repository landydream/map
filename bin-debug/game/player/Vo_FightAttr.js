var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**保存属性 */
var Vo_FightAttr = (function () {
    function Vo_FightAttr() {
        /**战斗属性保存 */
        this.fightMap = {};
    }
    /**设置属性 */
    Vo_FightAttr.prototype.setAttr = function (type, value) {
        this.fightMap[type] = value;
    };
    /**获取一个属性 */
    Vo_FightAttr.prototype.getAttr = function (type) {
        var value = 0;
        if (this.fightMap[type]) {
            value = this.fightMap[type];
        }
        return value;
    };
    /**累加属性 */
    Vo_FightAttr.prototype.addFightValue = function (type, value) {
        this.fightMap[type] = this.getAttr(type) + value;
        return this;
    };
    /**根据表配置累加属性 */
    Vo_FightAttr.prototype.addFightValueByStr = function (str, percent) {
        if (percent === void 0) { percent = 1; }
        // let arr = ConfigHelp.splitIntArr(str);
        var arr = [];
        this.addAttrInfo(arr, percent);
        return this;
    };
    /**减去属性 */
    Vo_FightAttr.prototype.minusFightValue = function (type, value) {
        this.fightMap[type] = this.getAttr(type) - value;
        return this;
    };
    /**根据属性数据增加属性 */
    Vo_FightAttr.prototype.addAttrInfo = function (info, percent) {
        if (percent === void 0) { percent = 1; }
        if (!info) {
            return this;
        }
        for (var i = 0; i < info.length; i++) {
            if (info[i].lenght <= 1) {
                continue;
            }
            var type = parseInt(info[i][0]);
            var value = Math.ceil(parseInt(info[i][1]) * percent);
            this.addFightValue(type, value);
        }
        return this;
    };
    Vo_FightAttr.prototype.addFightByMap = function (map, percent) {
        if (percent === void 0) { percent = 1; }
        for (var k in map) {
            this.addFightValue(parseInt(k), map[k]);
        }
    };
    /**获取战斗力值*/
    Vo_FightAttr.prototype.getStrength = function () {
        var rs = 0;
        var caculateDic = ConfigHelp.StrCaculateDic;
        var type = 0, value = 0, mul = 0;
        for (var key in this.fightMap) {
            type = parseInt(key);
            value = this.fightMap[key];
            mul = caculateDic[type];
            if (!mul) {
                continue;
            }
            rs += value * mul;
        }
        rs = Math.ceil(rs);
        return rs;
    };
    /**清除属性 */
    Vo_FightAttr.prototype.clear = function () {
        this.fightMap = {};
        return this;
    };
    Vo_FightAttr.create = function () {
        var vo = new Vo_FightAttr();
        return vo;
    };
    Vo_FightAttr.voFight = new Vo_FightAttr();
    return Vo_FightAttr;
}());
__reflect(Vo_FightAttr.prototype, "Vo_FightAttr");
//# sourceMappingURL=Vo_FightAttr.js.map