var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**人物身上位置数据 */
var Vo_Pos = (function () {
    function Vo_Pos() {
        /**强化表编号 */
        this.strengthen = 0;
        /**精炼表编号 */
        this.jingLian = 0;
        /**锻炼表编号 */
        this.zhuLing = 0;
        /**宝石表编号 */
        this.stone = 0;
    }
    // public getPower():number {
    // 	var num = 0;
    // 	if(this.equip) {
    // 		num += this.equip.getPower(true);
    // 	}
    // 	return num;
    // }
    Vo_Pos.create = function (pos) {
        var vo = new Vo_Pos();
        vo.pos = pos;
        return vo;
    };
    return Vo_Pos;
}());
__reflect(Vo_Pos.prototype, "Vo_Pos");
//# sourceMappingURL=Vo_Pos.js.map