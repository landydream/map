var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AIGangMovePlug = (function () {
    function AIGangMovePlug() {
        this.tag = "AIGangMovePlug";
        this.index = 0;
        this.remain = 0;
        this.tarP = new egret.Point();
    }
    AIGangMovePlug.prototype.onAdd = function () {
        this.remain = 6000 * Math.random();
        this.setBron();
        //this.startMove();
        GameGlobal.control.listen(MapScene.MSG_MAPCFG_COMPLECT, this.onMapCfgLoadComp, this);
    };
    AIGangMovePlug.prototype.onRemove = function () {
        GameGlobal.control.remove(MapScene.MSG_MAPCFG_COMPLECT, this.onMapCfgLoadComp, this);
    };
    AIGangMovePlug.prototype.onMapCfgLoadComp = function () {
        this.setBron();
        if (Math.random() > 0.5) {
            this.startMove();
        }
        else {
            this.remain = 6000 * Math.random();
        }
    };
    AIGangMovePlug.prototype.setBron = function () {
        var p = this.getNextPoint();
        if (p) {
            this.tar.x = p.x;
            this.tar.y = p.y;
        }
    };
    AIGangMovePlug.prototype.update = function (ctx) {
        var self = this;
        self.remain -= ctx.dt;
        if (self.remain < 0 && self.tar.action == Action.IDLE) {
            self.remain = 5000 * Math.random() + 1500;
            if (Math.random() > 0.5)
                self.startMove();
        }
    };
    AIGangMovePlug.prototype.getNextPoint = function () {
        var mapMgr = GameGlobal.mapscene.mapMgr;
        var paths = mapMgr.paths;
        if (paths.length == 0)
            return null;
        this.index = Math.round(Math.random() * paths.length);
        if (this.index >= paths.length)
            this.index = 0;
        var p = paths[this.index];
        this.tarP.x = p.x + Math.random() * -80 + Math.random() * 100;
        this.tarP.y = p.y + Math.random() * -80 + Math.random() * 100;
        return this.tarP;
    };
    AIGangMovePlug.prototype.startMove = function () {
        var mapMgr = GameGlobal.mapscene.mapMgr;
        var p = this.getNextPoint();
        if (p != null) {
            // var suc: boolean = mapMgr.searchPath(this.tar.x, this.tar.y, p.x, p.y);
            // var path = mapMgr.getLastPath();
            var path = [p.y, p.x];
            if (path)
                this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
        }
    };
    AIGangMovePlug.prototype.onEvent = function (evt, arg) {
    };
    return AIGangMovePlug;
}());
__reflect(AIGangMovePlug.prototype, "AIGangMovePlug");
//# sourceMappingURL=AIGangMovePlug.js.map