var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AutoMovePlug = (function () {
    function AutoMovePlug() {
        this.tag = "AutoMovePlug";
        this.index = 0;
    }
    AutoMovePlug.prototype.onAdd = function () {
    };
    AutoMovePlug.prototype.onRemove = function () {
    };
    AutoMovePlug.prototype.update = function (ctx) {
        console.log(ctx);
    };
    AutoMovePlug.prototype.onEvent = function (evt, arg) {
        if (evt == SceneCharRole.UEVENT_REACH) {
            var mapMgr = GameGlobal.mapscene.mapMgr;
            var paths = mapMgr.paths;
            if (paths.length == 0)
                return;
            this.index++;
            if (this.index >= paths.length)
                this.index = 0;
            var p = paths[this.index];
            var suc = mapMgr.searchPath(this.tar.x, this.tar.y, p.x, p.y);
            var path = mapMgr.getLastPath();
            this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
        }
    };
    return AutoMovePlug;
}());
__reflect(AutoMovePlug.prototype, "AutoMovePlug");
//# sourceMappingURL=AutoMovePlug.js.map