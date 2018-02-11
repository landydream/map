var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserInputPlug = (function () {
    function UserInputPlug() {
        this.tag = "UserInputPlug";
    }
    UserInputPlug.prototype.onAdd = function () {
        this.tar.scene.mapMgr.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    };
    UserInputPlug.prototype.onRemove = function () {
        this.tar.scene.mapMgr.view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
    };
    UserInputPlug.prototype.update = function (ctx) {
    };
    UserInputPlug.prototype.onToucBegin = function (e) {
        var tar = this.tar;
        var mapscene = tar.scene;
        if (mapscene.mapMgr.isLoading == true || GameGlobal.isInBattle == true) {
            return;
        }
        var distx = e.localX;
        var disty = e.localY;
        var map = this.tar.scene.mapMgr;
        var suc = map.searchPath(this.tar.x, this.tar.y, distx, disty);
        if (suc == false)
            return;
        var path = map.getLastPath();
        if (path && path.length > 0) {
            this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
            this.tar.onEvent(SceneCharRole.UEVENT_USERCLICKMAP, null);
        }
    };
    UserInputPlug.prototype.onEvent = function (evt, arg) {
    };
    return UserInputPlug;
}());
__reflect(UserInputPlug.prototype, "UserInputPlug");
//# sourceMappingURL=UserInputPlug.js.map