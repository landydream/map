var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_JingMai = (function () {
    function Vo_JingMai() {
        this.level = 1;
        this.star = 0;
    }
    /**获取表里的序号 */
    Vo_JingMai.prototype.getId = function () {
        var id = this.level * 1000 + this.star;
        return id;
    };
    return Vo_JingMai;
}());
__reflect(Vo_JingMai.prototype, "Vo_JingMai");
//# sourceMappingURL=Vo_JingMai.js.map