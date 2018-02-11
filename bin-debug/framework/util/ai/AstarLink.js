var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var AstarLink = (function () {
    function AstarLink() {
    }
    AstarLink.create = function (sn, en) {
        var ret = AstarLink.pool.length ? AstarLink.pool.pop() : new AstarLink();
        ret.sn = sn;
        ret.en = en;
        return ret;
    };
    AstarLink.pool = [];
    return AstarLink;
}());
__reflect(AstarLink.prototype, "AstarLink");
//# sourceMappingURL=AstarLink.js.map