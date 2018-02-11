var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AIMoveNoPathPlug = (function () {
    function AIMoveNoPathPlug() {
        this.tag = "AIMoveNoPathPlug";
    }
    AIMoveNoPathPlug.prototype.onAdd = function () {
    };
    AIMoveNoPathPlug.prototype.onRemove = function () {
    };
    AIMoveNoPathPlug.prototype.update = function (ctx) {
    };
    AIMoveNoPathPlug.prototype.move = function (x, y) {
        this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, [y, x]);
    };
    AIMoveNoPathPlug.prototype.onEvent = function (evt, arg) {
    };
    return AIMoveNoPathPlug;
}());
__reflect(AIMoveNoPathPlug.prototype, "AIMoveNoPathPlug");
//# sourceMappingURL=AIMoveNoPathPlug.js.map