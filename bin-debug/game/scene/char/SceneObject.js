var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneObject = (function () {
    function SceneObject() {
        this.x = 0;
        this.y = 0;
        /** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
        this.objType = 0;
        //1 主角  2 其他玩家 3 场景怪物
        this.forceType = 0;
        this.sid = 0;
        this.scale = 1;
        this.id = SceneObject.COUNTER++;
    }
    SceneObject.prototype.update = function (ctx) {
    };
    SceneObject.prototype.onAdd = function () {
    };
    SceneObject.prototype.onRemove = function () {
    };
    SceneObject.prototype.onEvent = function (evt, arg) {
        if (arg === void 0) { arg = null; }
    };
    SceneObject.COUNTER = 0;
    return SceneObject;
}());
__reflect(SceneObject.prototype, "SceneObject", ["ISceneObject"]);
//# sourceMappingURL=SceneObject.js.map