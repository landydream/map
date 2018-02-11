var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeadGroup = (function () {
    function HeadGroup() {
    }
    HeadGroup.create = function () {
        var ret = new HeadGroup();
        return ret;
    };
    HeadGroup.prototype.updateTitle = function () {
    };
    return HeadGroup;
}());
__reflect(HeadGroup.prototype, "HeadGroup");
//# sourceMappingURL=HeadGroup.js.map