var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapItemConst = (function () {
    function MapItemConst() {
    }
    MapItemConst.NPC = 1;
    MapItemConst.EFFECT = 2;
    MapItemConst.DOOR = 3;
    MapItemConst.BORNPOINT = 4;
    MapItemConst.PATHPOINT = 5;
    return MapItemConst;
}());
__reflect(MapItemConst.prototype, "MapItemConst");
//# sourceMappingURL=MapItemConst.js.map