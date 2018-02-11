var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LockTargetInvPlug = (function () {
    function LockTargetInvPlug() {
        this.tag = "LockTargetInvPlug";
        this.takeCare = false;
    }
    LockTargetInvPlug.prototype.onAdd = function () {
        this.takeCare = true;
        var sceneType = GameGlobal.mapscene.scenetype;
        var path;
        if (sceneType == SceneCtrl.TOURNAMENT || sceneType == SceneCtrl.KFBOSS) {
            path = [this.tar.y, this.tar.x];
        }
        else {
            var map = this.tar.scene.mapMgr;
            var suc = map.searchPath(this.role.x, this.role.y, this.tar.x, this.tar.y);
            if (suc == false)
                return;
            path = map.getLastPath();
        }
        if (path && path.length > 0) {
            this.role.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
        }
    };
    LockTargetInvPlug.prototype.onRemove = function () {
    };
    LockTargetInvPlug.prototype.update = function (ctx) {
        var self = this;
        if (self.tar == null)
            return;
        //已到达交互范围
        if (self.tar.checkIntRange(self.role.x, self.role.y)) {
            ctx.d = 1;
            self.tar.onEvent(SceneCharRole.UEVENT_ON_TOUCH, 0);
            self.role.onEvent(SceneCharRole.UEVENT_STOPMOVE, 0);
        }
        if (self.takeCare == false) {
            ctx.d = 1;
            return;
        }
    };
    LockTargetInvPlug.prototype.onEvent = function (evt, arg) {
        if (evt == SceneCharRole.UEVENT_USERCLICKMAP) {
            this.takeCare = false; //被中断
        }
    };
    return LockTargetInvPlug;
}());
__reflect(LockTargetInvPlug.prototype, "LockTargetInvPlug");
//# sourceMappingURL=LockTargetInvPlug.js.map