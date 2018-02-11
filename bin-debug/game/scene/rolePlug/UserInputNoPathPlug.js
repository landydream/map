var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserInputNoPathPlug = (function () {
    function UserInputNoPathPlug() {
        this.tag = "UserInputNoPathPlug";
    }
    UserInputNoPathPlug.prototype.onAdd = function () {
        this.tar.scene.mapMgr.tileLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    };
    UserInputNoPathPlug.prototype.onRemove = function () {
        this.tar.scene.mapMgr.tileLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    };
    UserInputNoPathPlug.prototype.update = function (ctx) {
    };
    UserInputNoPathPlug.prototype.onToucBegin = function (e) {
        var tar = this.tar;
        var mapscene = tar.scene;
        if (mapscene.mapMgr.isLoading == true || GameGlobal.isInBattle == true) {
            return;
        }
        var distx = e.localX;
        var disty = e.localY;
        var arr = [distx, disty];
        this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, [arr[1], arr[0]]);
        this.tar.onEvent(SceneCharRole.UEVENT_USERCLICKMAP, null);
    };
    UserInputNoPathPlug.prototype.onEvent = function (evt, arg) {
    };
    return UserInputNoPathPlug;
}());
__reflect(UserInputNoPathPlug.prototype, "UserInputNoPathPlug");
//# sourceMappingURL=UserInputNoPathPlug.js.map