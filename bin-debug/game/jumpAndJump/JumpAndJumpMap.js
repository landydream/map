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
var JumpAndJumpMap = (function (_super) {
    __extends(JumpAndJumpMap, _super);
    function JumpAndJumpMap() {
        var _this = _super.call(this) || this;
        _this.map1 = new eui.Image();
        _this.map2 = new eui.Image();
        _this.addChild(_this.map1);
        _this.addChild(_this.map2);
        return _this;
    }
    JumpAndJumpMap.prototype.createMap = function () {
        ImageLoader.instance.loader(ResURL.getBoxUrl('bg'), this.map1);
        ImageLoader.instance.loader(ResURL.getBoxUrl('bg'), this.map2);
        this.map1.y = 0;
        this.map2.y = -1920;
    };
    return JumpAndJumpMap;
}(eui.Panel));
__reflect(JumpAndJumpMap.prototype, "JumpAndJumpMap");
//# sourceMappingURL=JumpAndJumpMap.js.map