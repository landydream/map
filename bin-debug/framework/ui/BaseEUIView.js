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
var BaseEUIView = (function (_super) {
    __extends(BaseEUIView, _super);
    function BaseEUIView() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        return _this;
    }
    BaseEUIView.prototype.childrenCreated = function () {
        this.isInit = true;
    };
    BaseEUIView.prototype.onOpen = function (arg) {
    };
    BaseEUIView.prototype.onClose = function () {
    };
    BaseEUIView.prototype.initUI = function () {
    };
    BaseEUIView.prototype.destoryView = function () {
    };
    BaseEUIView.prototype.destory = function () {
    };
    BaseEUIView.prototype.openCheck = function () {
        return false;
    };
    BaseEUIView.prototype.addCloseListen = function (obj) {
        obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    BaseEUIView.prototype.removeCloseListen = function (obj) {
        obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
    };
    BaseEUIView.prototype.closeHandler = function () {
        GameGlobal.layerMgr.close(this.pid);
    };
    BaseEUIView.prototype.drawBG = function (w, h, x, y, a) {
        if (w === void 0) { w = -1; }
        if (h === void 0) { h = -1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (a === void 0) { a = 1; }
        if (w == -1) {
            w = App.stage.stageWidth;
            h = App.stage.stageHeight;
        }
        if (this.bgSprite == null) {
            this.bgSprite = new egret.Sprite();
            this.addChildAt(this.bgSprite, 0);
        }
        this.bgSprite.graphics.beginFill(0, a);
        this.bgSprite.graphics.drawRect(x, y, w, h);
        this.bgSprite.graphics.endFill();
        this.addCloseListen(this.bgSprite);
    };
    BaseEUIView.prototype.setTouched = function (v) {
        this.touchEnabled = this.touchChildren = v;
    };
    return BaseEUIView;
}(eui.Component));
__reflect(BaseEUIView.prototype, "BaseEUIView", ["IUIView"]);
//# sourceMappingURL=BaseEUIView.js.map