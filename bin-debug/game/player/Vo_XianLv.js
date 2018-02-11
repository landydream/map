var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_XianLv = (function () {
    function Vo_XianLv() {
        this.battle = [0, 0];
        this.xianLv = {};
    }
    Vo_XianLv.prototype.getVo = function (id) {
        return this.xianLv[id];
    };
    return Vo_XianLv;
}());
__reflect(Vo_XianLv.prototype, "Vo_XianLv");
var Vo_XianLvCulture = (function () {
    function Vo_XianLvCulture(id) {
        this.lev = 1000;
        this.star = 1;
        this.exp = 0;
        this.extExp = 0;
        this.id = id;
    }
    Vo_XianLvCulture.prototype.getExp = function () {
        return this.exp + this.extExp;
    };
    return Vo_XianLvCulture;
}());
__reflect(Vo_XianLvCulture.prototype, "Vo_XianLvCulture");
//# sourceMappingURL=Vo_XianLv.js.map