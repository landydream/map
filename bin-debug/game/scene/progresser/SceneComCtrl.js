var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneComCtrl = (function (_super) {
    __extends(SceneComCtrl, _super);
    function SceneComCtrl() {
        return _super.call(this) || this;
    }
    SceneComCtrl.prototype.update = function (ctx) {
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    SceneComCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
    };
    SceneComCtrl.prototype.onExit = function (scene) {
        this.scene.ctx = {};
        this.scene.removeAll();
    };
    SceneComCtrl.prototype.aiUpdate = function (ctx) {
    };
    return SceneComCtrl;
}(SceneCtrl));
__reflect(SceneComCtrl.prototype, "SceneComCtrl");
//# sourceMappingURL=SceneComCtrl.js.map