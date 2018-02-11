var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Pet = (function () {
    function Vo_Pet() {
        /**出战数据，第一位是出战，其他是备战 */
        this.battle = [0, 0, 0];
        /**激活的宠物数据 */
        this.list = {};
    }
    Vo_Pet.prototype.getVo = function (id) {
        return this.list[id];
    };
    return Vo_Pet;
}());
__reflect(Vo_Pet.prototype, "Vo_Pet");
var Vo_OnePet = (function () {
    function Vo_OnePet() {
        /**等级 */
        this.level = 1;
        /**经验 */
        this.exp = 0;
        /**资质等级 */
        this.zizhi = 0;
        /**五行 [[五行类型, 五行等级]]*/
        this.wuxing = [];
        /**洗练次数 */
        this.refreshNum = 0;
        /**飞升等阶 */
        this.flyLevel = 0;
        /**飞升经验 */
        this.flyExp = 0;
        /***幻化状态 */
        this.flyState = 0;
    }
    Vo_OnePet.prototype.init = function (id) {
        this.id = id;
        var cfg = Config.PET_ACTIVE[id];
        this.name = cfg.mz;
        this.wuxing = ConfigHelp.splitIntArr(cfg.wx);
        this.skill = [];
        var list = cfg.jn.split(",");
        for (var i = 0, len = list.length; i < len; i++) {
            this.skill.push([parseInt(list[i]), 0, 0]);
        }
    };
    return Vo_OnePet;
}());
__reflect(Vo_OnePet.prototype, "Vo_OnePet");
//# sourceMappingURL=Vo_Pet.js.map