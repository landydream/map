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
var JumpAndJumpView = (function (_super) {
    __extends(JumpAndJumpView, _super);
    function JumpAndJumpView() {
        return _super.call(this) || this;
    }
    JumpAndJumpView.prototype.init = function () {
        this.mapLayer = new egret.DisplayObjectContainer();
        this.boxLayer = new egret.DisplayObjectContainer();
        this.roleLayer = new egret.DisplayObjectContainer();
        this.addChild(this.mapLayer);
        this.addChild(this.boxLayer);
        this.addChild(this.roleLayer);
        this.map = new JumpAndJumpMap();
        this.map.createMap();
        this.mapLayer.addChild(this.map);
    };
    return JumpAndJumpView;
}(eui.Panel));
__reflect(JumpAndJumpView.prototype, "JumpAndJumpView");
//# sourceMappingURL=JumpAndJumpView.js.map