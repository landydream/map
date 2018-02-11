var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerStopPlug = (function () {
    function PlayerStopPlug() {
        this.tag = "PlayerStopPlug";
    }
    PlayerStopPlug.prototype.onAdd = function () {
    };
    PlayerStopPlug.prototype.onRemove = function () {
    };
    PlayerStopPlug.prototype.update = function (ctx) {
    };
    PlayerStopPlug.prototype.onEvent = function (evt, arg) {
        if (evt == SceneCharRole.UEVENT_REACH) {
        }
    };
    return PlayerStopPlug;
}());
__reflect(PlayerStopPlug.prototype, "PlayerStopPlug");
//# sourceMappingURL=PlayerStopPlug.js.map