var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**装备额外数据 */
var Vo_EquipEx = (function () {
    function Vo_EquipEx() {
        /**附加属性系数 */
        this.exRatio = 0;
    }
    Vo_EquipEx.create = function () {
        var vo = new Vo_EquipEx();
        return vo;
    };
    return Vo_EquipEx;
}());
__reflect(Vo_EquipEx.prototype, "Vo_EquipEx");
//# sourceMappingURL=Vo_EquipEx.js.map