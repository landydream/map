var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Formula = (function () {
    function Formula() {
    }
    Formula.caculateDmg = function (role, tar, skillPower) {
        var fixed = Formula.getRestritionNumber(role.attackType, role.armorType);
        var rnd = Math.random() * 0.2 + 0.8;
        var ret = Math.ceil(((role.level * 0.4 + 2) * skillPower) / (tar.armor * 0.02 + 2) * fixed * rnd);
        return ret;
    };
    Formula.getRestritionNumber = function (attackType, armorType) {
        var ret = 1;
        if (attackType == 1) {
            ret = 2;
        }
        else {
            ret = 1;
        }
        return ret;
    };
    return Formula;
}());
__reflect(Formula.prototype, "Formula");
//# sourceMappingURL=Formula.js.map